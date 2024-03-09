import React from 'react';
import InputField from '../components/common/InputField';
import useCustomTheme from '../hooks/useCustomTheme';
import PasswordInputField from '../components/common/PasswordInputField';
import Button from '../components/Button';
import CommonScreenContainer from '../containers/CommonScreenContainer';
import ScreenTopLogo from '../components/common/ScreenTopLogo';
import Spacer from '../components/common/Spacer';
import LoginScreenRememberMeCheckboxLine from '../components/LoginRegisterScreen/LoginScreenRememberMeCheckboxLine';
import TermsAndConditionWarning from '../components/LoginRegisterScreen/TermsAndConditionWarning';
import LoginScreenFaqFooter from '../components/LoginRegisterScreen/LoginScreenFaqFooter';
import {useFormik} from 'formik';
import loginValidationSchema, {
  loginInitialValues,
} from '../validationSchemas/loginValidation';

import useLoginSubmission from '../hooks/useLoginSubmission';
import useAuthDispatch from '../contexts/hooks/useAuthDispatch';
import useLanguage from '../hooks/useLanguage';

const spacing = 30;

export default function LoginScreen() {
  const language = useLanguage();
  const theme = useCustomTheme();
  const handleLogin = useLoginSubmission();
  const setAuth = useAuthDispatch();

  const [isCheckedRemember, setIsCheckedRemember] = React.useState(false);

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async values => {
      const res = await handleLogin({...values}, true);
      setAuth(res);
    },
  });

  return (
    <CommonScreenContainer>
      <ScreenTopLogo />
      <InputField
        placeholder={language.LOGIN_SCREEN.EMAIL}
        onChangeText={formik.handleChange('email')}
        value={formik.values.email}
        error={formik.touched.email ? formik.errors.email : null}
        onBlur={formik.handleBlur('email')}
        keyboardType="email-address"
      />

      <PasswordInputField
        placeholder={language.LOGIN_SCREEN.PASSWORD}
        onChangeText={formik.handleChange('password')}
        value={formik.values.password}
        error={formik.touched.password ? formik.errors.password : null}
        onBlur={formik.handleBlur('password')}
      />

      <LoginScreenRememberMeCheckboxLine
        isCheckedRemember={isCheckedRemember}
        setIsCheckedRemember={setIsCheckedRemember}
      />

      <Spacer height={spacing} width="100%" />
      <TermsAndConditionWarning />

      <Spacer height={20} width="100%" />
      <Button
        title={language.LOGIN_SCREEN.LOGIN}
        backgroundColor={theme.PRIMARY}
        textColor={theme.OPPOSITE_OF_ACCENT}
        variant="fillRounded"
        disabled={!formik.isValid}
        onPress={formik.handleSubmit}
      />
      <Spacer height={spacing} width="100%" />

      <Spacer height={spacing} width="100%" />
      {/* <SocialLoginButtons variant="login" />  for the next version  */}

      <LoginScreenFaqFooter variant="login" />
    </CommonScreenContainer>
  );
}
