import React from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import useCustomTheme from '../../hooks/useCustomTheme';

type Props = {
  index: number;
  x: SharedValue<number>;
};

const Dot = ({index, x}: Props) => {
  const theme = useCustomTheme();
  const {width: SCREEN_WIDTH} = useWindowDimensions();

  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [70, 70, 70],
      Extrapolate.CLAMP
    );

    const backgroundColor = interpolateColor(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [theme.DISABLED_BG, theme.PRIMARY, theme.DISABLED_BG]
    );

    return {
      width: widthAnimation,
      backgroundColor: backgroundColor,
    };
  });

  return <Animated.View style={[styles.dots, animatedDotStyle]} />;
};

export default Dot;

const styles = StyleSheet.create({
  dots: {
    height: 10,
    width: 50,
    marginHorizontal: 10,
    borderRadius: 5,
  },
});
