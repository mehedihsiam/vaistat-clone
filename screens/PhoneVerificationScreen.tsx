import {StyleSheet, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import ScreenTitle from '../components/common/ScreenTitle';
import Button from '../components/Button';
import useCustomTheme from '../hooks/useCustomTheme';
import PhoneInput from '../components/common/PhoneInput';
import Spacer from '../components/common/Spacer';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {validatePhoneNumber} from '../validationSchemas/commonValidations';
import useCustomNavigate from '../hooks/useCustomNavigate';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import useSendOtp from '../APIs/hooks/useSendOtp';
import {LOGGED_OUT_ROUTES} from '../constants/ROUTES';
import useDispatchAppLocalData from '../contexts/hooks/useDispatchAppLocalData';
import useSignupFormDataContext from '../contexts/hooks/useSignupFormDataContext';
import useLanguage from '../hooks/useLanguage';
import useSnackBarSetContext from '../contexts/hooks/useSnackBarLoadingContext';

export default function PhoneVerificationScreen() {
  const language = useLanguage();
  const country_code = '+1';
  const {navigate} = useCustomNavigate();
  const theme = useCustomTheme();
  const sendOtp = useSendOtp();
  const dispatchAppLocalData = useDispatchAppLocalData();
  const localSignUpData = useSignupFormDataContext();
  const snackbar = useSnackBarSetContext();

  const handleSubmit = async (phoneNumber: string) => {
    dispatchAppLocalData?.setIsLoading(
      true,
      language.PHONE_VERIFICATION_SCREEN.SENDING_CODE
    );
    const res = await sendOtp({mobile: `${country_code}${phoneNumber}`});

    if (res.code === 200) {
      dispatchAppLocalData?.setIsLoading(false);
      if (localSignUpData?.localData) {
        localSignUpData?.setLocalData({
          ...localSignUpData.localData,
          phoneNumber,
          country_code,
        });
        navigate(LOGGED_OUT_ROUTES.OTP);
      } else {
        navigate(LOGGED_OUT_ROUTES.REGISTER);
      }
    } else {
      snackbar?.showSnackBar(res.message, 'error');
      dispatchAppLocalData?.setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
    },
    validationSchema: yup.object({
      phoneNumber: validatePhoneNumber(),
    }),
    onSubmit: values => {
      handleSubmit(values.phoneNumber);
    },
  });

  useEffect(() => {
    if (formik.values.phoneNumber.length === 10) {
      formik.handleSubmit();
    }
  }, [formik.values.phoneNumber]);

  return (
    <NonScrollableScreenContainer>
      <ScreenTitle title={language.PHONE_VERIFICATION_SCREEN.TITLE} />
      <Spacer width="100%" height={20} />
      <ScrollView style={styles.container}>
        <PhoneInput
          placeholder={language.PHONE_VERIFICATION_SCREEN.PHONE_NUMBER}
          onChangeText={formik.handleChange('phoneNumber')}
          value={formik.values.phoneNumber}
          error={formik.touched.phoneNumber ? formik.errors.phoneNumber : null}
          onBlur={formik.handleBlur('phoneNumber')}
        />
      </ScrollView>
      <Button
        title={language.COMMON_TEXTS.NEXT}
        variant="fillRounded"
        backgroundColor={theme.PRIMARY}
        textColor={theme.OPPOSITE_OF_ACCENT}
        disabled={!formik.isValid || !formik.dirty}
        onPress={formik.handleSubmit}
      />
    </NonScrollableScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
