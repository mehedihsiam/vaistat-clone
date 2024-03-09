import React from 'react';
import {FlexAlignType, StyleSheet, View} from 'react-native';
import {TWidth} from '../../types/widthType';

type TFlexRowStart = {
  children: React.ReactNode;
  gap?: number;
  padding?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  flexWrap?: 'wrap' | 'nowrap';
  alignItems?: FlexAlignType;
  width?: TWidth;
};

export default function FlexRowBetween(props: TFlexRowStart) {
  const extraStyle = {
    gap: props.gap,
    padding: props.padding,
    paddingVertical: props.paddingVertical,
    paddingHorizontal: props.paddingHorizontal,
    flexWrap: props.flexWrap,
    alignItems: props.alignItems || 'center',
    width: props.width || 'auto',
  };
  return <View style={[styles.container, extraStyle]}>{props.children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
