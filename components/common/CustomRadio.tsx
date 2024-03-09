import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import useCustomTheme from '../../hooks/useCustomTheme';
import {TSetState} from '../../types/setStateType';
import Typography, {TTypographyBase} from './Typography';

type TCustomRadio = {
  title?: string;
  selectedOption: string;
  setSelectedOption: TSetState<string>;
  titleStye?: TTypographyBase;
};

export default function CustomRadio(props: TCustomRadio) {
  const theme = useCustomTheme();
  const isActive = props.selectedOption === props.title;

  const colors = {
    backgroundColor: theme.PRIMARY,
  };

  const handelSelect = () => {
    props.setSelectedOption(props.selectedOption);
  };

  return (
    <TouchableOpacity
      style={styles.optionContainer}
      onPress={handelSelect}
      activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}>
      <View
        style={[
          styles.radio,
          {
            borderColor: props.selectedOption
              ? theme.PRIMARY
              : theme.DISABLED_TEXT,
          },
        ]}>
        {isActive && <View style={[styles.radioInside, colors]} />}
      </View>
      <Typography>{props.title}</Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
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
