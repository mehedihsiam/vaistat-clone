import {StyleSheet, View} from 'react-native';
import React from 'react';
import Typography from './Typography';
import useCustomTheme from '../../hooks/useCustomTheme';

export default function ComingSoon() {
  const theme = useCustomTheme();
  return (
    <View style={styles.container}>
      <Typography
        textAlign="center"
        color={theme.PRIMARY}
        fontSize={24}
        fontWeight="600">
        Coming Soon
      </Typography>
      <Typography textAlign="center" color={theme.ACCENT} fontWeight="400">
        This screen is under construction.
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
