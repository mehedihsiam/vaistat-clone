// CustomSwitch.js
import React from 'react';
import {StyleSheet, Switch, View} from 'react-native';
import useCustomTheme from '../../hooks/useCustomTheme';
import Spacer from './Spacer';
import Typography, {TTypographyBase} from './Typography';

type TCustomSwitch = {
  label?: string;
  description?: string;
  labelStyle?: TTypographyBase;
  descriptionStyle?: TTypographyBase;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

const CustomSwitch = ({
  description,
  label,
  labelStyle,
  descriptionStyle,
  value,
  onValueChange,
}: TCustomSwitch) => {
  const theme = useCustomTheme();
  return (
    <View style={label ? styles.containerWithLabel : styles.container}>
      <Switch
        style={{transform: [{scaleX: 1.1}, {scaleY: 1.1}]}}
        trackColor={{false: `${theme.DISABLED_TEXT}`, true: `${theme.PRIMARY}`}}
        thumbColor={`${theme.OPPOSITE_OF_ACCENT}`}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onValueChange}
        value={value}
      />
      <View>
        {label && <Typography {...labelStyle}>{label}</Typography>}
        <Spacer height={4} />
        {description && (
          <Typography {...descriptionStyle}>{description}</Typography>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
  },
  containerWithLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 8,
  },
});

export default CustomSwitch;
