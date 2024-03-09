import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import useCustomTheme from '../../hooks/useCustomTheme';
import radiusHalfCalculation from '../../utils/radiusHalfCalculation';
import {TOnPress} from '../Button/Button';
import {TWidth} from '../../types/widthType';

type TOutlineButton = {
  children: React.ReactNode;
  onPress?: TOnPress;
  borderColor?: string;
  width?: TWidth;
  disabled?: boolean;
};

export default function OutlineButton(props: TOutlineButton) {
  const theme = useCustomTheme();
  const borderColor = props.borderColor
    ? props.borderColor
    : theme.DISABLED_TEXT;
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={[
        styles.container,
        {
          borderColor: props.disabled ? theme.ACCENT_DIMMED : borderColor,
          width: props.width || 'auto',
        },
      ]}
      activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
      onPress={props.onPress}>
      {props.children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    borderRadius: radiusHalfCalculation(48).radius,
    borderWidth: 1,
    flex: 1,
  },
});
