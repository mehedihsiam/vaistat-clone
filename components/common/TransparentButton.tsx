import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import {TCommonButton} from '../Button/Button';
import {TWidth} from '../../types/widthType';

type TIconButton = TCommonButton & {
  children: React.ReactNode;
  height?: number;
  width?: TWidth;
};

export default function TransparentButton(props: TIconButton) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          width: props.width || 'auto',
          height: props.height || 40,
        },
      ]}
      activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
      onPress={props.onPress}>
      {props.children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
