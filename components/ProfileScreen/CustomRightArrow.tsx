import {View, StyleSheet} from 'react-native';
import React from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';
import SVGs from '../../assets';

export default function CustomRightArrow() {
  const theme = useCustomTheme();
  return (
    <View style={styles.arrowButton}>
      {SVGs.ArrowLeft(24, 24, theme.ACCENT)}
    </View>
  );
}

const styles = StyleSheet.create({
  arrowButton: {
    transform: [{rotateY: '180deg'}],
  },
});
