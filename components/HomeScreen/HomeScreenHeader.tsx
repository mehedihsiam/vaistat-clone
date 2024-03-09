import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import SVGs from '../../assets';
import useCustomTheme from '../../hooks/useCustomTheme';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import {LOGGED_IN_ROUTES} from '../../constants/ROUTES';
import {useHomeNavigatorContextDispatch} from '../../contexts/hooks/useHomeNavigatorContext';
import Typography from '../common/Typography';
import IconButtonWithCounter from './IconButtonWithCounter';
import useNotificationContext from '../../contexts/hooks/useNotificationContext';
import Spacer from '../common/Spacer';
import {THomeHeader} from '../../types/homeHeaderTitle';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';

export default function HomeScreenHeader(props: THomeHeader) {
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
        <TouchableOpacity
          activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
          style={[styles.button, {backgroundColor: theme.OPPOSITE_OF_ACCENT}]}
          onPress={handleOpenSidebar}>
          {SVGs.List(30, 30, theme.PRIMARY)}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
          style={[styles.button, {backgroundColor: theme.OPPOSITE_OF_ACCENT}]}
          onPress={handleNavigate(LOGGED_IN_ROUTES.SCAN_QR_CODE)}>
          {SVGs.QRCode(30, 30, theme.PRIMARY)}
        </TouchableOpacity>
      </View>
      {props.customTitle ? (
        props.customTitle
      ) : props.title ? (
        <Typography color={props.titleColor} fontWeight="600">
          {props.title}
        </Typography>
      ) : null}
      <View style={[styles.buttonContainer, styles.paddingRight]}>
        <Spacer width={10} height={10} />
        <View
          style={[styles.button, {backgroundColor: theme.OPPOSITE_OF_ACCENT}]}>
          <IconButtonWithCounter
            icon={SVGs.Notification(24, 24, theme.PRIMARY)}
            count={notification?.notificationCount || 0}
            onPress={handleNavigate(LOGGED_IN_ROUTES.NOTIFICATION)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 5,
    marginVertical: 10,
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 100,
  },
  paddingRight: {paddingRight: 10},

  button: {
    padding: 5,
    height: 45,
    width: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
