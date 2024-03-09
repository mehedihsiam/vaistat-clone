import {View, ViewStyle} from 'react-native';
import React from 'react';
import SVGs from '../../assets';
import useCustomTheme from '../../hooks/useCustomTheme';

type TSuccessTick = {
  size?: number;
};

export default function SuccessTick(props: TSuccessTick) {
  const theme = useCustomTheme();

  const iconSize = (props.size || 20) - 3;

  const circleSize = props.size || 20;
  const radius = props.size ? props.size / 2 : 10;

  const style: ViewStyle = {
    width: circleSize,
    height: circleSize,
    borderRadius: radius,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.PRIMARY,
  };

  return (
    <View style={style}>
      {SVGs.Check(iconSize, iconSize, theme.OPPOSITE_OF_ACCENT)}
    </View>
  );
}
