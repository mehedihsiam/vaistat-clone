import {TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Typography from '../Typography';
import COMMONLY_USED_DATA from '../../../constants/COMMONLY_USED_DATA';
import Radio from './Radio';

type TRadioButton = {
  option: string;
  optionValue?: string;

  selected: boolean;
  handlePress?: (option: string) => () => void;
  disabled?: boolean;
};

export default function RadioButton(props: TRadioButton) {
  const disabledOpacity = {opacity: props.disabled ? 0.5 : 1};
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={[styles.optionContainer, disabledOpacity]}
      onPress={
        props.handlePress
          ? props.handlePress(props.optionValue || props.option)
          : undefined
      }
      activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}>
      <Radio isSelected={props.disabled ? false : props.selected} />
      <Typography>{props.option}</Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    width: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
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
