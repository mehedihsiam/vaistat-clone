import React from 'react';
import {
  DimensionValue,
  FlexAlignType,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

type TFlexRowStart = {
  children: React.ReactNode;
  gap?: number;
  padding?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  flexWrap?: 'wrap' | 'nowrap';
  alignItems?: FlexAlignType;
  height?: DimensionValue | undefined;
  flex?: number;
};

export default function FlexRowStart(props: TFlexRowStart) {
  const extraStyle: ViewStyle = {
    gap: props.gap,
    padding: props.padding,
    paddingVertical: props.paddingVertical,
    paddingHorizontal: props.paddingHorizontal,
    flexWrap: props.flexWrap,
    alignItems: props.alignItems || 'center',
    height: props.height,
    flex: props.flex,
  };
  return <View style={[styles.container, extraStyle]}>{props.children}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
