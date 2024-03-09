import React from 'react';
import {FlexAlignType, StyleSheet, View} from 'react-native';

type TFlexRowStart = {
  children: React.ReactNode;
  gap?: number;
  padding?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  flexWrap?: 'wrap' | 'nowrap';
  alignItems?: FlexAlignType;
};

export default function ColumnCenter(props: TFlexRowStart) {
  const extraStyle = {
    gap: props.gap,
    padding: props.padding,
    paddingVertical: props.paddingVertical,
    paddingHorizontal: props.paddingHorizontal,
    flexWrap: props.flexWrap,
    alignItems: props.alignItems || 'center',
  };
  return <View style={[styles.container, extraStyle]}>{props.children}</View>;
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
