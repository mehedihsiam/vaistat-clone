import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import useCustomTheme from '../../hooks/useCustomTheme';
import {TCommonInputField} from '../../types/inputCommonProps';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import Typography from './Typography';
import FlexRowStart from './FlexRowStart';

type TPaymentInput = TCommonInputField & {
  label: string;
  leftIcon?: React.ReactNode;
  hideLeftIcon?: boolean;
};

export default function InputWithLabel(props: TPaymentInput) {
  const theme = useCustomTheme();

  const extraStyle = {
    backgroundColor: theme.DISABLED_BG,
    borderColor: props.error ? theme.DANGER : theme.DISABLED_BG,
  };

  return (
    <View style={[styles.box]}>
      <View style={[styles.container, extraStyle]}>
        <Typography
          color={props.error ? theme.DANGER : theme.DISABLED_TEXT}
          fontSize={12}>
          {props.error ? props.error : props.label}
        </Typography>
        <FlexRowStart gap={5}>
          {props.hideLeftIcon ? null : props.leftIcon ? (
            props.leftIcon
          ) : (
            <Typography>$</Typography>
          )}
          <TextInput
            value={props.value}
            onChangeText={props.onChangeText}
            placeholderTextColor={theme.DISABLED_TEXT}
            placeholder={props.placeholder}
            selectionColor={theme.PRIMARY}
            style={[styles.input, {color: theme.ACCENT}]}
            keyboardType={props.keyboardType || 'number-pad'}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            editable={props.editable}
            maxLength={props.maxLength}
          />
        </FlexRowStart>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    width: 'auto',
  },
  container: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  input: {
    width: '100%',
    padding: 0,
    fontSize: COMMONLY_USED_DATA.DEFAULT_FONT_SIZE,
  },
});
