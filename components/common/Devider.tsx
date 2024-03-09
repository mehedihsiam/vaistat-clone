import React from 'react';
import {StyleSheet, View} from 'react-native';
import useCustomTheme from '../../hooks/useCustomTheme';

const Divider = () => {
  const theme = useCustomTheme();
  return <View style={[styles.container, {backgroundColor: theme.ACCENT}]} />;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 2,
    opacity: 0.1,
  },
});

export default Divider;
