import {View, StyleSheet} from 'react-native';
import React from 'react';
import InputField from '../InputField';
import useCustomTheme from '../../../hooks/useCustomTheme';
import Typography from '../Typography';
import SVGs from '../../../assets';
import {TCommonInputField} from '../../../types/inputCommonProps';

export default function PhoneInput(props: TCommonInputField) {
  const theme = useCustomTheme();
  return (
    <View style={styles.container}>
      <View style={[styles.button, {backgroundColor: theme.DISABLED_BG}]}>
        {SVGs.FlagCanada(24, 24)}
        {SVGs.CaretDown(24, 24)}
        <Typography>+1</Typography>
      </View>
      <InputField keyboardType="number-pad" {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    gap: 10,
  },
  button: {
    height: 56,
    width: 91,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
