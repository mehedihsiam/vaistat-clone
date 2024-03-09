import React from 'react';
import CommonScreenContainer from '../containers/CommonScreenContainer';
import Typography from '../components/common/Typography';
import LockIcon from '../components/ForgotPasswordScreen/LockIcon';
import {StyleSheet, View} from 'react-native';
import InputField from '../components/common/InputField';
import Button from '../components/Button';
import useCustomTheme from '../hooks/useCustomTheme';
import Spacer from '../components/common/Spacer';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {validateEmail} from '../validationSchemas/commonValidations';
import useSendTempPassword from '../APIs/hooks/useSendTempPassword';
import useDispatchAppLocalData from '../contexts/hooks/useDispatchAppLocalData';
import LinkText from '../components/common/LinkText';
import useCustomNavigate from '../hooks/useCustomNavigate';
import {LOGGED_OUT_ROUTES} from '../constants/ROUTES';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';

export default function ForgetPasswordScreen() {
  const theme = useCustomTheme();
  const sendTempPassword = useSendTempPassword();
  const dispatchAppLocalData = useDispatchAppLocalData();
  const [message, setMessage] = React.useState('');
  const {navigate} = useCustomNavigate();

  const handleGoToLogin = () => {
    navigate(LOGGED_OUT_ROUTES.LOGIN);
  };

  const handleSendTempPassword = async (email: string) => {
    dispatchAppLocalData?.setIsLoading(true);

    const res = await sendTempPassword(email);
    if (res.code === 200) {
      setMessage(res.message);
      formik.resetForm();
      dispatchAppLocalData?.setIsLoading(false);
    } else {
      dispatchAppLocalData?.setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: yup.object().shape({
      email: validateEmail(),
    }),
    onSubmit: values => {
      handleSendTempPassword(values.email);
    },
  });
  return (
    <CommonScreenContainer
      screenTitleProps={{
        title: 'Forgot Password',
        showBackButton: true,
        paddingHorizontal: COMMONLY_USED_DATA.SCREEN_PADDING,
      }}>
      <View style={styles.container}>
        <LockIcon />
        <Typography textAlign="center">
          Please enter your email to receive a temporary password
        </Typography>
        <Spacer height={20} />
        <InputField
          placeholder="Enter your email address"
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value={formik.values.email}
          error={formik.touched.email ? formik.errors.email : null}
        />
        {message.length ? (
          <>
            <Typography textAlign="left">Password sent</Typography>
            <LinkText onPress={handleGoToLogin}>
              Login with that password and change it ASAP
            </LinkText>
            <Spacer height={20} />
          </>
        ) : null}
        <Button
          title="Send"
          variant="fillRounded"
          backgroundColor={theme.PRIMARY}
          textColor={theme.OPPOSITE_OF_ACCENT}
          onPress={formik.handleSubmit}
          disabled={!formik.isValid}
        />
      </View>
    </CommonScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 30,
    alignItems: 'center',
  },
});
