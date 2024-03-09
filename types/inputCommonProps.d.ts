import {TWidth} from './widthType';

export type TCommonInputField = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  width?: TWidth;
  height?: number;
  error?: string | null;
  keyboardType?: KeyboardTypeOptions | undefined;
  textAlignVertical?: 'center' | 'top' | 'auto' | 'bottom' | undefined;
  multiline?: boolean | undefined;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  numberOfLines?: number | undefined;
  editable?: boolean;
  hideError?: boolean;
  flex?: number;
  maxLength?: number;
};
