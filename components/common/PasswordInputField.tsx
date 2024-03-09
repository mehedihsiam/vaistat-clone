import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';
import useInputCommonStyles from '../../hooks/useInputCommonStyles';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import {TCommonInputField} from '../../types/inputCommonProps';
import SVGs from '../../assets';

export default function PasswordInputField(props: TCommonInputField) {
  const theme = useCustomTheme();
  const commonStyle = useInputCommonStyles({error: props.error});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(prev => !prev);
  }, []);

  return (
    <View style={commonStyle.container}>
      <TouchableOpacity
        activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
        style={styles.eyeButton}
        onPress={togglePasswordVisibility}>
        {isPasswordVisible ? SVGs.Eye(24, 24) : SVGs.EyeClose(24, 24)}
      </TouchableOpacity>
      <TextInput
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholderTextColor={theme.DISABLED_TEXT}
        selectionColor={theme.PRIMARY}
        style={[commonStyle.input]}
        secureTextEntry={!isPasswordVisible}
        keyboardType="default"
        onBlur={props.onBlur}
        onFocus={props.onFocus}
      />
      <Text style={[commonStyle.errorMessage]}>{props.error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  eyeButton: {
    position: 'absolute',
    right: 0,
    top: 28,
    transform: [{translateY: -14}],
    zIndex: 2,
    paddingHorizontal: 10,
  },
});
