import {TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';

type TMethodHEadingButton = {
  children: React.ReactNode;
  onPress: () => void;
};

export default function MethodHeadingButton(props: TMethodHEadingButton) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.headingButton}
      activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}>
      {props.children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  headingButton: {
    width: '100%',
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: 20,
  },
});
