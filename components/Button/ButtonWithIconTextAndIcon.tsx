import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {TCommonButton} from './Button';
import Typography from '../common/Typography';
import SVGs from '../../assets';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import {TFontWeight} from '../../types/fontWeight';

export type TButtonWithIconTextAndIcon = TCommonButton & {
  icon?: React.ReactNode;
  hasRightArrow?: boolean;
  textColor?: string;
  fontSize?: number;
  fontWeight?: TFontWeight;
};

export default function ButtonWithIconTextAndIcon(
  props: TButtonWithIconTextAndIcon
) {
  return (
    <TouchableOpacity
      activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
      onPress={props.onPress}
      style={styles.container}>
      <View style={styles.flexContent}>
        {props.icon}
        <Typography
          fontWeight={props.fontWeight}
          color={props.textColor}
          fontSize={props.fontSize}>
          {props.title}
        </Typography>
      </View>
      {props.hasRightArrow && SVGs.ArrowRight(15, 9)}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  flexContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
