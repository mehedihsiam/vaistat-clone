import {TWidth} from '../../types/widthType';

export type TOnPress = ((event: GestureResponderEvent) => void) | undefined;

export type TCommonButton = {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  title?: string;
  disabled?: boolean;
  width?: TWidth;
  flex?: number;
  children?: React.ReactNode;
};
export type TPartialButton = {
  backgroundColor?: string;
  textColor?: string;
  icon?: React.ReactNode;
  disabledBgColor?: string;
  disabledTextColor?: string;
};
