import {View, StyleSheet} from 'react-native';
import React from 'react';
import useCustomTheme from '../hooks/useCustomTheme';
import SVGs from '../assets';
import Typography from './common/Typography';
import useLanguage from '../hooks/useLanguage';

export default function CancelJobAlert() {
  const language = useLanguage();
  const theme = useCustomTheme();
  return (
    <View style={[styles.container, {backgroundColor: theme.DANGER}]}>
      {SVGs.Warning(24, 24, theme.OPPOSITE_OF_ACCENT)}
      <Typography fontSize={14} flex={1} color={theme.OPPOSITE_OF_ACCENT}>
        {language.READY_DELIVERY_SCREEN.CANCEL_ALERT}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 6,
    gap: 10,
  },
});
