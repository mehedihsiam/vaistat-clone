import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import React from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import Typography from './Typography';
import FlexRowBetween from './FlexRowBetween';
import SVGs from '../../assets';
import Animated, {
  AnimatedStyle,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type TOption = {
  label: string;
  value?: string;
};

type TSelectInput = {
  label: string;
  selectedOption: string;
  setSelectedOption: (arg: string) => void;
  options: TOption[];
  optionsShowingPosition: 'top' | 'bottom';
};

export default function SelectInput(props: TSelectInput) {
  const theme = useCustomTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const opacity = useSharedValue(0);

  const toggleOpen = () => {
    if (opacity.value === 0) {
      opacity.value = withTiming(1);
      setIsOpen(true);
    } else {
      opacity.value = withTiming(0);
      setIsOpen(false);
    }
  };

  const containerExtraStyle = {
    borderBottomLeftRadius: isOpen ? 0 : 16,
    borderBottomRightRadius: isOpen ? 0 : 16,
    backgroundColor: theme.DISABLED_BG,
  };

  const arrowStyle = {
    transform: [{rotateX: isOpen ? '0deg' : '180deg'}],
  };

  const handleSelectOption = (option: TOption) => () => {
    props.setSelectedOption(option.value || option.label);
    toggleOpen();
  };

  const getPositionStyle = () => {
    switch (props.optionsShowingPosition) {
      case 'top':
        return {
          bottom: 55,
        };
      case 'bottom':
        return {
          top: 55,
        };

      default: {
      }
    }
  };

  const extraStyle: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>> = {
    backgroundColor: theme.DISABLED_BG,
    height: isOpen ? 55 * props.options.length : 0,
    overflow: 'hidden',
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <View style={[styles.container, containerExtraStyle]}>
      <TouchableOpacity
        activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
        onPress={toggleOpen}
        style={styles.containerButton}>
        <FlexRowBetween>
          <View>
            <Typography color={theme.DISABLED_TEXT} fontSize={12}>
              {props.label}
            </Typography>

            <Typography
              color={props.selectedOption ? theme.ACCENT : theme.DISABLED_TEXT}>
              {props.selectedOption || 'Select'}
            </Typography>
          </View>
          <View style={arrowStyle}>
            {SVGs.CaretUp(24, 24, theme.DISABLED_TEXT)}
          </View>
        </FlexRowBetween>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.optionsContainer,
          animatedStyle,
          getPositionStyle(),
          extraStyle,
        ]}>
        {props.options.map(option => (
          <TouchableOpacity
            onPress={handleSelectOption(option)}
            activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
            key={option.label}
            style={styles.optionButton}>
            <Typography color={theme.ACCENT}>{option.label}</Typography>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 55,
    width: '100%',
    position: 'relative',
    zIndex: 1,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,

    backgroundColor: 'red',
  },
  containerButton: {paddingVertical: 5, paddingHorizontal: 10},
  optionsContainer: {
    position: 'absolute',
    left: 0,
    width: '100%',
    zIndex: -1,
  },
  optionButton: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: 55,
    width: '100%',
  },
});
