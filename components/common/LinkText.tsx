import {TouchableOpacity} from 'react-native';
import React from 'react';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import useCustomTheme from '../../hooks/useCustomTheme';
import {TFontWeight} from '../../types/fontWeight';
import Typography from './Typography';
import {TTextAlign} from '../../types/textAlign';

type TLinkText = {
  children: React.ReactNode;
  onPress: () => void;
  fontSize?: number;
  fontWeight?: TFontWeight;
  color?: string;
  textAlign?: TTextAlign;
};

export default function LinkText(props: TLinkText) {
  const theme = useCustomTheme();
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}>
      <Typography
        color={props.color || theme.PRIMARY}
        fontSize={props.fontSize}
        fontWeight={props.fontWeight}
        textAlign={props.textAlign}>
        {props.children}
      </Typography>
    </TouchableOpacity>
  );
}
