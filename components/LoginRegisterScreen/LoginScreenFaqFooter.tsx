import {View, StyleSheet} from 'react-native';
import React from 'react';
import Typography from '../common/Typography';
import LinkText from '../common/LinkText';
import useCustomTheme from '../../hooks/useCustomTheme';
import Spacer from '../common/Spacer';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import {LOGGED_OUT_ROUTES, ROOT_ROUTES} from '../../constants/ROUTES';
import useLanguage from '../../hooks/useLanguage';

type TLoginScreenFaqFooter = {
  variant: 'login' | 'register';
};

export default function LoginScreenFaqFooter(props: TLoginScreenFaqFooter) {
  const theme = useCustomTheme();
  const {navigate} = useCustomNavigate();
  const language = useLanguage();
  const isLogin = props.variant === 'login';

  const handleNavigate = (faq?: boolean) => () => {
    if (faq) {
      navigate(ROOT_ROUTES.FAQ);
    } else {
      navigate(isLogin ? LOGGED_OUT_ROUTES.REGISTER : LOGGED_OUT_ROUTES.LOGIN);
    }
  };

  return (
    <View style={styles.container}>
      <Typography color={theme.DISABLED_TEXT}>
        {isLogin
          ? language.LOGIN_SCREEN.DONT_HAVE_ACCOUNT
          : language.ACCOUNT_CREATION_SCREEN.ALREADY_HAVE_ACCOUNT}
      </Typography>
      <LinkText onPress={handleNavigate()}>
        {isLogin
          ? language.LOGIN_SCREEN.SIGN_UP
          : language.ACCOUNT_CREATION_SCREEN.LOGIN}
      </LinkText>
      <Spacer height={40} width="100%" />
      <LinkText onPress={handleNavigate(true)}>
        {language.COMMON_TEXTS.FAQ}
      </LinkText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    alignItems: 'center',
  },
});
