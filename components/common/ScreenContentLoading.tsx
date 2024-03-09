import {
  View,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';

export default function ScreenContentLoading() {
  const dimensions = useWindowDimensions();
  const theme = useCustomTheme();
  return (
    <View style={[styles.container, {height: dimensions.height - 100}]}>
      <ActivityIndicator size="large" color={theme.PRIMARY} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
