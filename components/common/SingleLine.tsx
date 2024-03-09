import {View, StyleSheet} from 'react-native';
import React from 'react';
import {TWidth} from '../../types/widthType';
import useCustomTheme from '../../hooks/useCustomTheme';

type TSingleLine = {
  width?: TWidth;
};

export default function SingleLine(props: TSingleLine) {
  const theme = useCustomTheme();
  const styles = StyleSheet.create({
    line: {
      borderBottomColor: theme.ACCENT_DIMMED,
      borderBottomWidth: 1,
      height: 1,
      width: props.width,
    },
  });
  return <View style={styles.line} />;
}
