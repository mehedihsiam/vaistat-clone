import {StyleSheet, useWindowDimensions} from 'react-native';
import React from 'react';
import useSnackBarColorAndIcon, {
  TSnackBarVariant,
} from '../../contexts/hooks/useSnackBarColorAndIcon';
import Typography from './Typography';
import Animated, {SharedValue, useAnimatedStyle} from 'react-native-reanimated';

type TSnackBar = {
  variant: TSnackBarVariant;
  message: string;
  top: SharedValue<number>;
};

export default function SnackBar(props: TSnackBar) {
  const {color, icon} = useSnackBarColorAndIcon(props.variant);
  const {width} = useWindowDimensions();

  const snackbarWidth = width - 50;
  const translateX = -(snackbarWidth / 2);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: props.top.value,
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        animatedStyle,
        {
          width: snackbarWidth,
          transform: [{translateX}],
          backgroundColor: color,
        },
      ]}>
      {icon}
      <Typography color="white" fontSize={14}>
        {props.message}
      </Typography>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: '50%',
    bottom: 0,
    zIndex: 101,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 60,
  },
});
