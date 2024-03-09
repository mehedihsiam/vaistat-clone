import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import Button from '../../components/Button';
import DetailsBoxWrapper from '../../components/common/DetailsBoxWrapper';
import FlexRowBetween from '../../components/common/FlexRowBetween';
import OutlineButton from '../../components/common/OutlineButton';
import Spacer from '../../components/common/Spacer';
import Typography from '../../components/common/Typography';
import useCustomTheme from '../../hooks/useCustomTheme';
import {TSetState} from '../../types/setStateType';
import ModalContainer from '../ModalContainer';
import ModalHeader from '../ModalHeader';
import useLanguage from '../../hooks/useLanguage';

type TDirectionModal = {
  open: boolean;
  setOpen: TSetState<boolean>;
  onOpenMap?: () => void;
  onPressThisApp?: () => void;
};
const DirectionModal = (props: TDirectionModal) => {
  const language = useLanguage();
  const theme = useCustomTheme();

  const defaultMapAppName = Platform.select({
    ios: 'Apple Maps',
    android: 'Google Maps',
  });

  return (
    <ModalContainer modalVisible={props.open} setModalVisible={props.setOpen}>
      <View style={styles.container}>
        <DetailsBoxWrapper>
          <ModalHeader
            setOpen={props.setOpen}
            title={language.READY_DELIVERY_SCREEN.DIRECTIONS}
            showCrossButton
          />
          <Spacer height={15} />
          <Typography textAlign="center">
            {language.READY_DELIVERY_SCREEN.WHERE_DO_YOU_WANNA_SEE}
          </Typography>
          <Spacer height={15} />
          <FlexRowBetween
            gap={10}
            flexWrap="wrap"
            paddingHorizontal={5}
            paddingVertical={10}>
            <Button
              variant="fillRounded"
              title={language.READY_DELIVERY_SCREEN.THIS_APP}
              backgroundColor={theme.PRIMARY}
              textColor={theme.OPPOSITE_OF_ACCENT}
              onPress={props.onPressThisApp}
            />
            <OutlineButton
              borderColor={theme.DISABLED_TEXT}
              onPress={props.onOpenMap}>
              <Typography>{defaultMapAppName}</Typography>
            </OutlineButton>
          </FlexRowBetween>
        </DetailsBoxWrapper>
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 280,
    width: 350,
  },
});

export default DirectionModal;
