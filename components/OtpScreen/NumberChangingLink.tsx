import {View, StyleSheet} from 'react-native';
import React from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';
import SVGs from '../../assets';
import LinkText from '../common/LinkText';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import useLanguage from '../../hooks/useLanguage';

export default function NumberChangingLink() {
  const language = useLanguage();
  const theme = useCustomTheme();
  const {goBack} = useCustomNavigate();
  return (
    <View style={styles.goBackText}>
      {SVGs.ArrowLeft(24, 24, theme.PRIMARY)}
      <LinkText fontWeight="500" onPress={goBack}>
        &nbsp;&nbsp;{language.OTP_SCREEN.WRONG_NUMBER}
      </LinkText>
    </View>
  );
}

const styles = StyleSheet.create({
  goBackText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
