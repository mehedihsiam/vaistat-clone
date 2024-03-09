import {TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import {TCommonButton} from './Button';
import Typography from '../common/Typography';
import useCustomTheme from '../../hooks/useCustomTheme';

type TButtonFullWidthFill = TCommonButton & {
  textColor?: string;
};

export default function ButtonTransparent(props: TButtonFullWidthFill) {
  const theme = useCustomTheme();

  return (
    <TouchableOpacity
      style={style.container}
      onPress={props.onPress}
      activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
      disabled={props.disabled}>
      <Typography color={props.disabled ? theme.ACCENT : props.textColor}>
        {props.title}
      </Typography>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
