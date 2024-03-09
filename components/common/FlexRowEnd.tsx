import {View, StyleSheet, FlexAlignType} from 'react-native';
import React from 'react';

type TFlexRowStart = {
  children: React.ReactNode;
  gap?: number;
  padding?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  flexWrap?: 'wrap' | 'nowrap';
  alignItems?: FlexAlignType;
  flex?: number;
};

export default function FlexRowEnd(props: TFlexRowStart) {
  const extraStyle = {
    gap: props.gap,
    padding: props.padding,
    paddingVertical: props.paddingVertical,
    paddingHorizontal: props.paddingHorizontal,
    flexWrap: props.flexWrap,
    alignItems: props.alignItems || 'center',
    flex: props.flex,
  };
  return <View style={[styles.container, extraStyle]}>{props.children}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
