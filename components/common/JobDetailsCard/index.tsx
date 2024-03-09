import React from 'react';
import {StyleSheet, View} from 'react-native';
import SVGs from '../../../assets';
import useCustomTheme from '../../../hooks/useCustomTheme';
import Button from '../../Button';
import DetailsBoxWrapper from '../DetailsBoxWrapper';
import FlexRowStart from '../FlexRowStart';
import JobDate from '../JobComponent/JobDate';
import JobPhoneNumber from '../JobComponent/JobPhoneNumber';
import Spacer from '../Spacer';
import Typography from '../Typography';
import openLink from '../../../utils/openLink';

type TJobDetailsCard = {
  location?: string;
  date?: string;
  contactNumber?: string;
  showChat?: boolean;
  onPressLocation?: () => void;
  hideLocationButton?: boolean;
};

const JobDetailsCard = (props: TJobDetailsCard) => {
  const theme = useCustomTheme();
  // const {navigate} = useCustomNavigate();
  // const handleNavigateChat = () => {
  //   navigate(LOGGED_IN_ROUTES.CHAT);
  // };

  const handleOpenCall = () => {
    if (props.contactNumber) {
      openLink(`tel:${props.contactNumber}`)();
    }
  };

  return (
    <DetailsBoxWrapper>
      {props.location && (
        <FlexRowStart gap={5}>
          {SVGs.Location(16, 16, theme.PRIMARY)}
          <Typography
            flex={1}
            fontSize={12}
            fontWeight="400"
            color={theme.DISABLED_TEXT}>
            {props.location}
          </Typography>
        </FlexRowStart>
      )}
      <Spacer height={12} />
      {props.contactNumber && (
        <JobPhoneNumber number={props.contactNumber} color={theme.PRIMARY} />
      )}
      <Spacer height={12} />
      {props.date && <JobDate date={props.date} color={theme.PRIMARY} />}
      <View style={styles.buttonBox}>
        {props.hideLocationButton ? null : props.location ? (
          <Button
            variant="circle"
            backgroundColor={theme.PRIMARY}
            onPress={props.onPressLocation}
            icon={SVGs.Location(24, 24, theme.OPPOSITE_OF_ACCENT)}
          />
        ) : null}
        {props.contactNumber && (
          <Button
            onPress={handleOpenCall}
            variant="circle"
            backgroundColor={theme.PRIMARY}
            icon={SVGs.PhoneWhite(24, 24, theme.OPPOSITE_OF_ACCENT)}
          />
        )}

        {/*   {props.showChat && (
          <Button
            onPress={handleNavigateChat}
            variant="circle"
            backgroundColor={theme.PRIMARY}
            icon={SVGs.ChatFill(24, 24, theme.OPPOSITE_OF_ACCENT)}
          />
        )} */}
      </View>
    </DetailsBoxWrapper>
  );
};

const styles = StyleSheet.create({
  container: {},
  buttonBox: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    paddingTop: 20,
  },
});

export default JobDetailsCard;
