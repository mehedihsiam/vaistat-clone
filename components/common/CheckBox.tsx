import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import React from 'react';
import {TSetState} from '../../types/setStateType';
import useCustomTheme from '../../hooks/useCustomTheme';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import Typography from './Typography';
import SVGs from '../../assets';

type TCheckBox = {
  isChecked: boolean;
  setIsChecked?: TSetState<boolean>;
  onPressCheckbox?: (param?: string) => void;
  label: string;
  value?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function CheckBox(props: TCheckBox) {
  const theme = useCustomTheme();
  const handleCheckBoxPress = () => {
    if (props.onPressCheckbox) {
      props.onPressCheckbox(props.value || props.label);
    }
    if (props.setIsChecked) {
      props.setIsChecked(!props.isChecked);
    }
  };

  const checkboxColors = {
    borderColor: props.isChecked ? theme.PRIMARY : theme.DISABLED_TEXT,
    backgroundColor: props.isChecked ? theme.PRIMARY : 'transparent',
  };

  return (
    <TouchableOpacity
      onPress={handleCheckBoxPress}
      activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
      style={props.containerStyle || styles.container}>
      <View style={[styles.checkBox, checkboxColors]}>
        {props.isChecked && SVGs.Check(16, 16, theme.OPPOSITE_OF_ACCENT)}
      </View>
      <Typography>{props.label}</Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkBox: {
    height: 20,
    width: 20,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
