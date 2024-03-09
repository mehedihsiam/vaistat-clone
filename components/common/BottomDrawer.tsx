import {StyleSheet, useWindowDimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type TBottomDrawer = {
  children: React.ReactNode;
  handleClose: () => void;
  isOpen: boolean;
};

export default function BottomDrawer(props: TBottomDrawer) {
  const theme = useCustomTheme();
  const {width, height} = useWindowDimensions();
  const hiddenPosition = height + 100;
  const top = useSharedValue(hiddenPosition);

  const toggleSlide = () => {
    if (props.isOpen) {
      top.value = withTiming(0);
    } else {
      top.value = withTiming(hiddenPosition);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: top.value,
    };
  });

  React.useEffect(() => {
    toggleSlide();
  }, [props.isOpen]);

  return (
    <Animated.View
      style={[
        styles.container,
        animatedStyle,
        {height, width, backgroundColor: theme.MODAL_BG},
      ]}>
      <TouchableOpacity
        onPress={props.handleClose}
        style={styles.closingArea}
      />
      {props.children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    position: 'absolute',
    left: 0,
    zIndex: 100,
  },
  closingArea: {
    flex: 1,
  },
});
