import React from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Typography from '../common/Typography';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';

type TIconButtonWithCounter = {
  onPress?: () => void;
  icon: React.ReactNode;
  count: number;
  style?: StyleProp<ViewStyle>;
};

const IconButtonWithCounter = (props: TIconButtonWithCounter) => {
  const theme = useCustomTheme();

  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
      onPress={props.onPress}>
      {props.count > 0 ? (
        <View style={styles.badgeContainer}>
          <Typography
            fontSize={12}
            fontWeight="600"
            color={theme.OPPOSITE_OF_ACCENT}>
            {props.count > 9 ? '9+' : props.count}
          </Typography>
        </View>
      ) : null}
      {props.icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'red',
    zIndex: 1,
  },
});

export default IconButtonWithCounter;
