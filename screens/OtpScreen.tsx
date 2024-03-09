import React, {useEffect} from 'react';
import ScreenTitle from '../components/common/ScreenTitle';
import {ScrollView, StyleSheet, View} from 'react-native';
import Button from '../components/Button';
import useCustomTheme from '../hooks/useCustomTheme';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import PhoneNumberText from '../components/OtpScreen/PhoneNumberText';
import Spacer from '../components/common/Spacer';
import OtpBoxes from '../components/OtpScreen/OtpBoxes';
import RemainingTimeToResendOtp from '../components/OtpScreen/RemainingTimeToResendOtp';
import NumberChangingLink from '../components/OtpScreen/NumberChangingLink';
import {LOGGED_OUT_ROUTES} from '../constants/ROUTES';
import useVerifyOtp from '../APIs/hooks/useVerifyOtp';
import useDispatchAppLocalData from '../contexts/hooks/useDispatchAppLocalData';
import useCustomNavigate from '../hooks/useCustomNavigate';
import useSendOtp from '../APIs/hooks/useSendOtp';
import useSignupFormDataContext from '../contexts/hooks/useSignupFormDataContext';
import useLanguage from '../hooks/useLanguage';
import useSnackBarSetContext from '../contexts/hooks/useSnackBarLoadingContext';

export default function OtpScreen() {
  const language = useLanguage();
  const theme = useCustomTheme();
  const verifyOtp = useVerifyOtp();
  const {navigate} = useCustomNavigate();
  const sendOtp = useSendOtp();
  const dispatchAppData = useDispatchAppLocalData();
  const [otp, setOtp] = React.useState('');
  const [remainingTime, setRemainingTime] = React.useState(60);
  const signUpFormDataContext = useSignupFormDataContext();
  const snackbar = useSnackBarSetContext();

  const mobile_no = signUpFormDataContext?.localData?.phoneNumber || '';
  const code = signUpFormDataContext?.localData?.country_code || '';

  const numberPart1 = mobile_no?.slice(0, 3) || '';
  const numberPart2 = mobile_no?.slice(3, 6) || '';
  const numberPart3 = mobile_no?.slice(6, mobile_no?.length) || '';

  const phoneNumber = `${code} ${numberPart1} ${numberPart2} ${numberPart3}`;
  const phoneNumberPlain = `${code}${mobile_no}`;

  const spacerHeight = 30;

  const handleNavigate = () => {
    navigate(LOGGED_OUT_ROUTES.LICENSE_DETAILS);
  };

  const handleResendOtp = async () => {
    dispatchAppData?.setIsLoading(true);
    const res = await sendOtp({mobile: phoneNumberPlain});

    if (res.code === 200) {
      dispatchAppData?.setIsLoading(false);
    } else {
      dispatchAppData?.setIsLoading(false);
    }
    setRemainingTime(60);
  };

  const handleVerifyOtp = async () => {
    dispatchAppData?.setIsLoading(true);
    const res = await verifyOtp({mobile: phoneNumberPlain, code: otp});
    if (res.code === 200) {
      dispatchAppData?.setIsLoading(false);
      handleNavigate();
    } else {
      snackbar?.showSnackBar(res.message, 'error');
      dispatchAppData?.setIsLoading(false);
    }
  };

  useEffect(() => {
    if (otp.length === 4) {
      handleVerifyOtp();
    }
  }, [otp]);

  return (
    <NonScrollableScreenContainer>
      <ScreenTitle title={language.OTP_SCREEN.TITLE} />
      <ScrollView style={styles.container}>
        <View style={styles.topBox}>
          <PhoneNumberText
            spacerHeight={spacerHeight}
            phoneNumber={phoneNumber}
          />
          <Spacer height={spacerHeight} />
          <OtpBoxes otp={otp} setOtp={setOtp} />

          <Spacer height={spacerHeight} />
          <RemainingTimeToResendOtp
            remainingTime={remainingTime}
            setRemainingTime={setRemainingTime}
            handleResendOtp={handleResendOtp}
          />

          <Spacer height={spacerHeight} />

          <NumberChangingLink />
        </View>
      </ScrollView>
      <Button
        title={language.COMMON_TEXTS.VERIFY}
        variant="fillRounded"
        backgroundColor={theme.PRIMARY}
        textColor={theme.OPPOSITE_OF_ACCENT}
        disabled={otp.length < 4}
        onPress={handleVerifyOtp}
      />
    </NonScrollableScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBox: {
    width: '100%',
    alignItems: 'center',
  },
});
