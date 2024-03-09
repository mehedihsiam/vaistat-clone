import React from 'react';
import {
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {TJobButton} from '.';
import COMMONLY_USED_DATA from '../../../constants/COMMONLY_USED_DATA';
import useCustomTheme from '../../../hooks/useCustomTheme';
import {TSetState} from '../../../types/setStateType';
import Button from '../../Button';
import FlexRowStart from '../FlexRowStart';
import Spacer from '../Spacer';
import Typography from '../Typography';
import JobLocation from './JobLocation';
import JobParentTopLine from './JobParentTopLine';
import useAuth from '../../../contexts/hooks/useAuth';
import useLanguage from '../../../hooks/useLanguage';

type TJobComponent = {
  isOpen: boolean;
  setIsOpen: TSetState<boolean>;
  logo: ImageSourcePropType;
  pharmacyName: string;
  pharmacyLocation: string;
  deliveryCount: number;
  pickupCount: number;
  buttonType?: TJobButton;
  pharmacy_id: string;
  onAcceptAll: (driver_id: string, pharmacy_id: string) => void;
};

export default function PharmacyInformation(props: TJobComponent) {
  const theme = useCustomTheme();
  const auth = useAuth();
  const language = useLanguage();

  const handAcceptAll = () => {
    if (auth?._id) {
      props.onAcceptAll(auth._id, props.pharmacy_id);
    }
  };

  const toggleIsOpen = () => {
    props.setIsOpen(!props.isOpen);
  };

  return (
    <View
      style={[
        styles.parentShownContainer,
        {borderBottomColor: theme.ACCENT_DIMMED},
      ]}>
      <TouchableOpacity
        style={styles.touchableContainer}
        activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
        onPress={toggleIsOpen}>
        <JobParentTopLine
          logo={props.logo}
          isOpen={props.isOpen}
          name={props.pharmacyName}
        />

        <JobLocation location={props.pharmacyLocation} />

        <FlexRowStart gap={5}>
          <Typography color={theme.INFO}>
            {props.deliveryCount} {language.COMMON_TEXTS.DELIVERIES}
          </Typography>

          {/* <Typography color={theme.SECONDARY}>
            {props.pickupCount} Pickup
          </Typography> */}
        </FlexRowStart>
      </TouchableOpacity>
      <Spacer height={10} />
      <Button
        title={`${props.buttonType ? props.buttonType : 'Accept'} All`}
        variant="fillRounded"
        backgroundColor={theme.PRIMARY}
        textColor={theme.OPPOSITE_OF_ACCENT}
        onPress={handAcceptAll}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  parentShownContainer: {
    width: '100%',
    paddingHorizontal: COMMONLY_USED_DATA.SCREEN_PADDING,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  touchableContainer: {
    width: '100%',
    gap: 5,
  },
});
