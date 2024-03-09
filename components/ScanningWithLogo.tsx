import {View} from 'react-native';
import React from 'react';
import SVGs from '../assets';
import Typography from './common/Typography';
import useCustomTheme from '../hooks/useCustomTheme';

export default function ScanningWithLogo() {
  const theme = useCustomTheme();
  return (
    <View>
      {SVGs.VaistatNFC(150, 216)}
      <Typography color={theme.PRIMARY} textAlign="center" fontWeight="600">
        Scanning...
      </Typography>
    </View>
  );
}
