import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import useCustomTheme from '../../../hooks/useCustomTheme';
import COMMONLY_USED_DATA from '../../../constants/COMMONLY_USED_DATA';
import Typography from '../Typography';
import {THeight} from '../../../types/widthType';

type TRightButton = {
  title?: string;
  bgColor?: string;
  height?: THeight;
  onPress?: () => void;
  icon?: React.ReactNode;
};

const RightButton = (props: TRightButton) => {
  const theme = useCustomTheme();
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
      style={[
        styles.container,

        {
          backgroundColor: props.bgColor || theme.PRIMARY,
          height: props.height || 120,
        },
      ]}>
      {props.title && (
        <Typography
          textAlign="center"
          color={theme.OPPOSITE_OF_ACCENT}
          fontWeight="600">
          {props.title}
        </Typography>
      )}
      {props.icon && props.icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

export default RightButton;
