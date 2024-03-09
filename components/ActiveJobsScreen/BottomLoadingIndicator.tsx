import {View, StyleSheet, useWindowDimensions} from 'react-native';
import React, {useEffect} from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const BottomLoadingIndicator = () => {
  const theme = useCustomTheme();
  const {width} = useWindowDimensions();
  const left = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      left: left.value,
    };
  });

  const changePosition = () => {
    if (left.value === 0) {
      left.value = withTiming(width, {duration: 600});
    } else if (left.value === width) {
      left.value = withTiming(0, {duration: 600});
    }
  };

  useEffect(() => {
    const timer = setInterval(changePosition, 600);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: theme.PRIMARY_THIN}]}>
      <Animated.View
        style={[
          styles.loader,
          {backgroundColor: theme.PRIMARY},
          animatedStyles,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 3,
    position: 'relative',
    alignItems: 'center',
  },
  loader: {
    width: 10,
    height: '100%',
    position: 'absolute',
    top: 0,
  },
});

export default BottomLoadingIndicator;
