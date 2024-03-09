import {View, StyleSheet} from 'react-native';
import React from 'react';
import useCustomTheme from '../../../hooks/useCustomTheme';

type TRadio = {
  isSelected: boolean;
};

export default function Radio(props: TRadio) {
  const theme = useCustomTheme();

  const colors = {
    backgroundColor: theme.PRIMARY,
  };

  return (
    <View
      style={[
        styles.radio,
        {
          borderColor: props.isSelected ? theme.PRIMARY : theme.DISABLED_TEXT,
        },
      ]}>
      {props.isSelected && <View style={[styles.radioInside, colors]} />}
    </View>
  );
}

const styles = StyleSheet.create({
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInside: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
});
