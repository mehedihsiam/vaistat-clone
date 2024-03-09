import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import useCustomTheme from '../../hooks/useCustomTheme';

type TSocialButton = {
  children: React.ReactNode;
};

export default function SocialButton(props: TSocialButton) {
  const theme = useCustomTheme();
  return (
    <TouchableOpacity
      activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
      style={[styles.button, {borderColor: theme.DISABLED_TEXT}]}>
      {props.children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    width: 48,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
