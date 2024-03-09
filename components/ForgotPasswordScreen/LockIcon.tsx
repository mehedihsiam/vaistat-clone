import {View, StyleSheet, useWindowDimensions} from 'react-native';
import React from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';
import SVGs from '../../assets';

export default function LockIcon() {
  const theme = useCustomTheme();
  const {width} = useWindowDimensions();

  const circleSize = width / 2.5;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.PRIMARY,
          height: circleSize,
          width: circleSize,
          borderRadius: circleSize / 2,
        },
      ]}>
      {SVGs.Lock(circleSize / 2, circleSize / 2, theme.OPPOSITE_OF_ACCENT)}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
});
