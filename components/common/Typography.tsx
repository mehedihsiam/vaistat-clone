import {Text, TextStyle} from 'react-native';
import React from 'react';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import {TTextAlign} from '../../types/textAlign';
import useCustomTheme from '../../hooks/useCustomTheme';
import {TFontWeight} from '../../types/fontWeight';

export type TTypographyBase = {
  children: React.ReactNode;
  textAlign?: TTextAlign;
  color?: string;
  fontSize?: number;
  fontWeight?: TFontWeight;
  flex?: number;
  opacity?: number;
  style?: TextStyle;
};

export default function Typography(props: TTypographyBase) {
  const theme = useCustomTheme();

  const style: TextStyle = {
    fontSize: props.fontSize || COMMONLY_USED_DATA.DEFAULT_FONT_SIZE,
    textAlign: props.textAlign || 'left',
    color: props.color || theme.ACCENT,
    fontWeight: props.fontWeight || 'normal',
    margin: 0,
    flex: props.flex || 0,
    opacity: props.opacity || 1,
  };
  return <Text style={[style, props.style]}>{props.children}</Text>;
}
