import {View, StyleSheet, ViewStyle, StyleProp} from 'react-native';
import React from 'react';
import {TSetState} from '../../../types/setStateType';
import Typography, {TTypographyBase} from '../Typography';

import useCustomTheme from '../../../hooks/useCustomTheme';
import RadioButton from './RadioButton';

type TRadioOptions = {
  title?: string;
  options: string[];
  optionValues?: string[];
  selectedOption: string;
  setSelectedOption?: TSetState<string>;
  onSelect?: (option: string) => void;
  titleStye?: TTypographyBase;
  flexRow?: boolean;
  gap?: number;
};

export default function RadioOptions(props: TRadioOptions) {
  const theme = useCustomTheme();

  const extraStyle: Record<string, StyleProp<ViewStyle>> = {
    container: {
      flexDirection: props.flexRow ? 'row' : 'column',
      flexWrap: props.flexRow ? 'wrap' : 'nowrap',
      gap: props.flexRow ? 10 : props.gap || 0,
      justifyContent: props.flexRow ? 'space-between' : 'center',
    },
  };

  const handlePress = (option: string) => () => {
    if (props.onSelect) {
      props.onSelect(option);
    } else if (props.setSelectedOption) {
      props.setSelectedOption(option);
    }
  };

  return (
    <View style={[styles.container]}>
      {props.title && (
        <Typography color={theme.DISABLED_TEXT} {...props.titleStye}>
          {props.title}
        </Typography>
      )}
      <View style={[styles.optionListContainer, extraStyle.container]}>
        {props.options.map((option, index) => {
          const optionValue = props.optionValues?.[index];
          const isSelected =
            props.selectedOption === option ||
            props.selectedOption === optionValue;
          return (
            <RadioButton
              key={`${option}--${props.title}`}
              handlePress={handlePress}
              option={option}
              optionValue={optionValue}
              selected={isSelected}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 10,
  },

  optionListContainer: {
    width: '100%',
  },
});
