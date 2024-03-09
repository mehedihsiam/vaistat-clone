import {View, StyleSheet} from 'react-native';
import React from 'react';
import SVGs from '../../assets';
import useCustomTheme from '../../hooks/useCustomTheme';
import TransparentButton from '../common/TransparentButton';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import {LOGGED_IN_ROUTES} from '../../constants/ROUTES';
import {useHomeNavigatorContextDispatch} from '../../contexts/hooks/useHomeNavigatorContext';
import Typography from '../common/Typography';
import IconButtonWithCounter from './IconButtonWithCounter';
import useNotificationContext from '../../contexts/hooks/useNotificationContext';
import Spacer from '../common/Spacer';
import {THomeHeader} from '../../types/homeHeaderTitle';

export default function HomeContextHeader(props: THomeHeader) {
  const theme = useCustomTheme();
  const {navigate} = useCustomNavigate();
  const dispatchHomeNavigatorContext = useHomeNavigatorContextDispatch();
  const notification = useNotificationContext();

  const handleOpenSidebar = () => {
    dispatchHomeNavigatorContext?.setOpenSidebar(true);
  };

  const handleNavigate = (route: string) => () => {
    navigate(route);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TransparentButton onPress={handleOpenSidebar}>
          {SVGs.List(30, 30, theme.PRIMARY)}
        </TransparentButton>
        <TransparentButton
          onPress={handleNavigate(LOGGED_IN_ROUTES.SCAN_QR_CODE)}>
          {SVGs.QRCode(30, 30, theme.ACCENT)}
        </TransparentButton>
      </View>
      {props.title && (
        <Typography color={props.titleColor} fontWeight="600">
          {props.title}
        </Typography>
      )}
      <View style={[styles.buttonContainer, styles.paddingRight]}>
        <Spacer width={10} height={10} />
        <IconButtonWithCounter
          icon={SVGs.Notification(24, 24, theme.DISABLED_TEXT)}
          count={notification?.notificationCount || 0}
          onPress={handleNavigate(LOGGED_IN_ROUTES.NOTIFICATION)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 100,
  },
  paddingRight: {paddingRight: 10},
});
