import {StyleSheet, View} from 'react-native';
import React from 'react';
import CheckBox from '../common/CheckBox';
import LinkText from '../common/LinkText';
import {TSetState} from '../../types/setStateType';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import {LOGGED_OUT_ROUTES} from '../../constants/ROUTES';
import useLanguage from '../../hooks/useLanguage';

type TLoginScreenRememberMeCheckboxLine = {
  isCheckedRemember: boolean;
  setIsCheckedRemember: TSetState<boolean>;
};

export default function LoginScreenRememberMeCheckboxLine(
  props: TLoginScreenRememberMeCheckboxLine
) {
  const language = useLanguage();
  const {navigate} = useCustomNavigate();

  const handleNavigate = () => {
    navigate(LOGGED_OUT_ROUTES.FORGET_PASSWORD);
  };

  return (
    <View style={styles.container}>
      <CheckBox
        isChecked={props.isCheckedRemember}
        setIsChecked={props.setIsCheckedRemember}
        label={language.LOGIN_SCREEN.REMEMBER_ME}
      />
      <LinkText onPress={handleNavigate}>
        {language.LOGIN_SCREEN.FORGOT_PASSWORD}
      </LinkText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
});
