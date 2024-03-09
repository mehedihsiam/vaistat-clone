import React from 'react';
import InputField from '../components/common/InputField';
import useCustomTheme from '../hooks/useCustomTheme';
import PasswordInputField from '../components/common/PasswordInputField';
import Button from '../components/Button';
import CommonScreenContainer from '../containers/CommonScreenContainer';
import Spacer from '../components/common/Spacer';
import TermsAndConditionWarning from '../components/LoginRegisterScreen/TermsAndConditionWarning';

import LoginScreenFaqFooter from '../components/LoginRegisterScreen/LoginScreenFaqFooter';
import {StyleSheet, View} from 'react-native';
import {useFormik} from 'formik';
import signUpValidationSchema, {
  signUpInitialValues,
} from '../validationSchemas/signUpValidation';
import useCustomNavigate from '../hooks/useCustomNavigate';
import {LOGGED_OUT_ROUTES} from '../constants/ROUTES';
import useSignupFormDataContext from '../contexts/hooks/useSignupFormDataContext';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';
import useLanguage from '../hooks/useLanguage';

const spacing = 30;

export default function RegisterScreen() {
  const language = useLanguage();
  const {navigate} = useCustomNavigate();
  const theme = useCustomTheme();
  const signupLocalContext = useSignupFormDataContext();
  const formik = useFormik({
    initialValues: signUpInitialValues,
    validationSchema: signUpValidationSchema,
    onSubmit: values => {
      delete values.confirm_password;
      signupLocalContext?.setLocalData({
        ...values,
        country_code: '',
        phoneNumber: '',
      });
      navigate(LOGGED_OUT_ROUTES.PHONE_VERIFICATION);
    },
  });

  return (
    <CommonScreenContainer
      screenTitleProps={{
        title: language.ACCOUNT_CREATION_SCREEN.TITLE,
        showBackButton: true,
        paddingHorizontal: COMMONLY_USED_DATA.SCREEN_PADDING,
      }}>
      <Spacer height={spacing} width="100%" />
      <View style={styles.nameContainer}>
        <InputField
          placeholder={language.ACCOUNT_CREATION_SCREEN.FIRST_NAME}
          value={formik.values.first_name}
          onChangeText={formik.handleChange('first_name')}
          onBlur={formik.handleBlur('first_name')}
          error={formik.touched.first_name ? formik.errors.first_name : null}
        />
        <InputField
          placeholder={language.ACCOUNT_CREATION_SCREEN.LAST_NAME}
          value={formik.values.last_name}
          onChangeText={formik.handleChange('last_name')}
          onBlur={formik.handleBlur('last_name')}
          error={formik.touched.last_name ? formik.errors.last_name : null}
        />
      </View>

      <InputField
        placeholder={language.ACCOUNT_CREATION_SCREEN.USERNAME}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
        error={formik.touched.username ? formik.errors.username : null}
      />

      <InputField
        placeholder={language.ACCOUNT_CREATION_SCREEN.EMAIL}
        value={formik.values.email}
        onChangeText={formik.handleChange('email')}
        onBlur={formik.handleBlur('email')}
        error={formik.touched.email ? formik.errors.email : null}
        keyboardType="email-address"
      />

      <PasswordInputField
        placeholder={language.ACCOUNT_CREATION_SCREEN.PASSWORD}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        error={formik.touched.password ? formik.errors.password : null}
      />

      <PasswordInputField
        placeholder={language.ACCOUNT_CREATION_SCREEN.CONFIRM_PASSWORD}
        value={formik.values.confirm_password}
        onChangeText={formik.handleChange('confirm_password')}
        onBlur={formik.handleBlur('confirm_password')}
        error={
          formik.touched.confirm_password
            ? formik.errors.confirm_password
            : null
        }
      />

      <TermsAndConditionWarning />

      <Spacer height={20} width="100%" />

      <Button
        title={language.COMMON_TEXTS.NEXT}
        backgroundColor={theme.PRIMARY}
        textColor={theme.OPPOSITE_OF_ACCENT}
        variant="fillRounded"
        onPress={formik.handleSubmit}
        disabled={!formik.isValid}
      />

      <Spacer height={spacing} width="100%" />

      <Spacer height={spacing} width="100%" />

      {/* <SocialLoginButtons variant="register" /> For the next version  */}

      <LoginScreenFaqFooter variant="register" />
    </CommonScreenContainer>
  );
}

const styles = StyleSheet.create({
  nameContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
});
