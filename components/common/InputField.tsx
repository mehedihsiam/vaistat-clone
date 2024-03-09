import React from 'react';
import {Text, TextInput, View} from 'react-native';
import useCustomTheme from '../../hooks/useCustomTheme';
import useInputCommonStyles from '../../hooks/useInputCommonStyles';
import {TCommonInputField} from '../../types/inputCommonProps';

export default function InputField(props: TCommonInputField) {
  const theme = useCustomTheme();
  const commonStyles = useInputCommonStyles({
    error: props.error,
    height: props.height,
  });
  const textAlignVertical = {
    textAlignVertical: props.textAlignVertical,
    padding: 10,
  };

  const flexStyle = {flex: props.flex === undefined ? 1 : props.flex};

  return (
    <View style={[commonStyles.container, flexStyle]}>
      <TextInput
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholderTextColor={theme.DISABLED_TEXT}
        selectionColor={theme.PRIMARY}
        style={[
          commonStyles.input,
          props.textAlignVertical ? textAlignVertical : null,
        ]}
        keyboardType={props.keyboardType}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        multiline={props.multiline}
        numberOfLines={props.numberOfLines}
      />
      {!props.hideError && (
        <Text style={[commonStyles.errorMessage]}>{props.error}</Text>
      )}
    </View>
  );
}
