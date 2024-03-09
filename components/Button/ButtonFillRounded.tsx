import {TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import {TCommonButton, TPartialButton} from './Button';
import Typography from '../common/Typography';
import useCustomTheme from '../../hooks/useCustomTheme';

type TButtonFullWidthFill = TCommonButton & TPartialButton;

export default function ButtonFillRounded(props: TButtonFullWidthFill) {
  const theme = useCustomTheme();
  const backgroundColor = {
    backgroundColor: props.disabled
      ? props.disabledBgColor || theme.DISABLED_BG
      : props.backgroundColor,
  };

  return (
    <TouchableOpacity
      style={[
        style.container,
        backgroundColor,
        {width: props.width || '100%', flex: props.flex},
      ]}
      onPress={props.onPress}
      activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
      disabled={props.disabled}>
      {props.children ? (
        props.children
      ) : props.title ? (
        <Typography
          color={
            props.disabled
              ? props.disabledTextColor || theme.ACCENT
              : props.textColor
          }>
          {props.title}
        </Typography>
      ) : null}
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
});
