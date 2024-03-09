import React from 'react';
import {View} from 'react-native';
import {TCommonButton, TPartialButton} from './Button';
import ButtonCircle from './ButtonCircle';
import ButtonFillRounded from './ButtonFillRounded';
import ButtonTransparent from './ButtonTransparent';
import ButtonWithIconTextAndIcon, {
  TButtonWithIconTextAndIcon,
} from './ButtonWithIconTextAndIcon';

type TButton = TCommonButton &
  TPartialButton &
  TButtonWithIconTextAndIcon & {
    variant: 'fillRounded' | 'transparent' | 'withTextAndIcon' | 'circle';
  };

export default function Button(props: TButton) {
  switch (props.variant) {
    case 'fillRounded':
      return <ButtonFillRounded {...props} />;
    case 'transparent':
      return <ButtonTransparent {...props} />;
    case 'circle':
      return <ButtonCircle {...props} />;
    case 'withTextAndIcon':
      return <ButtonWithIconTextAndIcon {...props} />;

    default:
      return <View />;
  }
}
