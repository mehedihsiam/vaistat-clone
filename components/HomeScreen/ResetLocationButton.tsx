import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import SVGs from '../../assets';
import useCustomTheme from '../../hooks/useCustomTheme';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';

type TResetLocationButton = {
  onPress?: () => void;
};

const ResetLocationButton = (props: TResetLocationButton) => {
  const theme = useCustomTheme();
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
      style={[styles.container, {backgroundColor: theme.PRIMARY}]}>
      {SVGs.MyLocation(32, 32, theme.OPPOSITE_OF_ACCENT)}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 25,
    right: 10,
  },
});

export default ResetLocationButton;
