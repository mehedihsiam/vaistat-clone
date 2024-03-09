import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import useCustomTheme from '../../hooks/useCustomTheme';
import {TCommonButton, TPartialButton} from './Button';

type TButtonFullWidthFill = TCommonButton & TPartialButton;

export default function ButtonCircle(props: TButtonFullWidthFill) {
  const theme = useCustomTheme();
  const backgroundColor = {
    backgroundColor: props.disabled ? theme.DISABLED_BG : props.backgroundColor,
  };

  return (
    <TouchableOpacity
      style={[style.container, backgroundColor]}
      onPress={props.onPress}
      activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
      disabled={props.disabled}>
      {props.icon}
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
});
