import {View, StyleSheet} from 'react-native';
import React from 'react';
import SocialButton from './SocialButton';
import SVGs from '../../assets';

type TSocialLoginButtons = {
  variant: 'login' | 'register';
};

export default function SocialLoginButtons(props: TSocialLoginButtons) {
  return (
    <View style={styles.container}>
      <SocialButton>{SVGs.Facebook(24, 24)}</SocialButton>
      <SocialButton>{SVGs.Google(24, 24)}</SocialButton>
      {props.variant === 'login' && (
        <SocialButton>{SVGs.UserFocus(24, 24)}</SocialButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
});
