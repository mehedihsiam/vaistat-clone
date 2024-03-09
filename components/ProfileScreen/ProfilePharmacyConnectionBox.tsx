import {View, StyleSheet} from 'react-native';
import React from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';
import Typography from '../common/Typography';
import useAuth from '../../contexts/hooks/useAuth';
import useLanguage from '../../hooks/useLanguage';

export default function ProfilePharmacyConnectionBox() {
  const language = useLanguage();
  const theme = useCustomTheme();
  const auth = useAuth();

  return (
    <View style={[styles.container, {backgroundColor: theme.DISABLED_BG}]}>
      <Typography fontWeight="500">
        {language.PROFILE_SCREEN.YOUR_CODE}
      </Typography>
      <View style={[styles.highlightedBox]}>
        <Typography fontWeight="500" color={theme.OPPOSITE_OF_ACCENT}>
          {auth?.pharmacyConnectionCode.code}
        </Typography>
      </View>
      <Typography textAlign="center">
        {language.PROFILE_SCREEN.USE_THIS_CODE}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    gap: 10,
  },
  highlightedBox: {
    width: '100%',
    paddingVertical: 7,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#616161',
  },
  flexCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
});
