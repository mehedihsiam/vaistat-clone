import {View, DimensionValue} from 'react-native';
import React from 'react';

type TSpacer = {
  height: number;
  width?: DimensionValue;
};

export default function Spacer(props: TSpacer) {
  return <View style={{height: props.height, width: props.width || '100%'}} />;
}
