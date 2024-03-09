import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';
import Typography from './Typography';
import {TSetState} from '../../types/setStateType';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';

type TOptionSwitch = {
  options: string[];
  selectedOption: string;
  setSelectedOption: TSetState<string>;
};

export default function OptionSwitch(props: TOptionSwitch) {
  const theme = useCustomTheme();

  const switchOption = (option: string) => () => {
    props.setSelectedOption(option);
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.DISABLED_BG}]}>
      {props.options.map(option => {
        const isActive = props.selectedOption === option;
        const bgColor = isActive ? theme.PRIMARY : 'transparent';
        return (
          <TouchableOpacity
            key={option}
            onPress={switchOption(option)}
            activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
            style={[
              styles.option,
              {
                backgroundColor: bgColor,
              },
            ]}>
            <Typography
              fontWeight="600"
              color={isActive ? theme.OPPOSITE_OF_ACCENT : theme.ACCENT}>
              {option}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  option: {
    width: '50%',
    height: '100%',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
