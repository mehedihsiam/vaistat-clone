import {StyleSheet, View} from 'react-native';
import React from 'react';
import CommonScreenContainer from '../containers/CommonScreenContainer';
import Typography from '../components/common/Typography';
import Spacer from '../components/common/Spacer';

import signUpExtraInfo, {
  phone_options,
  yn_options,
} from '../data/signUpExtraInfo';

import Button from '../components/Button';
import useCustomTheme from '../hooks/useCustomTheme';
import UserExtraInfoContainer from '../containers/UserExtraInfoContainer';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';
import useSignupFormDataContext from '../contexts/hooks/useSignupFormDataContext';
import useSignUp from '../APIs/hooks/useSignUp';
import useDispatchAppLocalData from '../contexts/hooks/useDispatchAppLocalData';
import useCustomNavigate from '../hooks/useCustomNavigate';
import {LOGGED_OUT_ROUTES} from '../constants/ROUTES';
import {TAuth} from '../types/auth';
import useSnackBarSetContext from '../contexts/hooks/useSnackBarLoadingContext';
import useCriminalBackgroundCheck from '../APIs/hooks/useCriminalBackgroundCheck';
import useLanguage from '../hooks/useLanguage';

export default function SignUpExtraInfoScreen() {
  const language = useLanguage();
  const theme = useCustomTheme();
  const signUpLocalData = useSignupFormDataContext();
  const dispatchAppLocalData = useDispatchAppLocalData();
  const snackbar = useSnackBarSetContext();
  const signUp = useSignUp();
  const {navigate} = useCustomNavigate();
  const backgroundCheck = useCriminalBackgroundCheck();

  const [selectedLanguages, setSelectedLanguages] = React.useState<string[]>(
    []
  );
  const [selectedTime, setSelectedTime] = React.useState<string[]>([]);
  const [selectedInternetOption, setSelectedInternetOption] =
    React.useState<string>(yn_options[0]);
  const [selectedVehicleOption, setSelectedVehicleOption] =
    React.useState<string>(yn_options[0]);
  const [selectedPhoneOption, setSelectedPhoneOption] = React.useState<string>(
    phone_options[0]
  );
  const [selectedExperienceOption, setSelectedExperienceOption] =
    React.useState<string>(yn_options[0]);
  const [selectedCriminalCheckOption, setSelectedCriminalCheckOption] =
    React.useState<string>(yn_options[0]);

  React.useEffect(() => {
    signUpExtraInfo.driver_speak_languages = selectedLanguages;
    signUpExtraInfo.driver_availability = selectedTime;
    signUpExtraInfo.driver_internet_plan = selectedInternetOption;
    signUpExtraInfo.driver_has_vehicle = selectedVehicleOption;
    signUpExtraInfo.driver_phone_type = selectedPhoneOption;
    signUpExtraInfo.is_first_delivery_experience = selectedExperienceOption;
    signUpExtraInfo.driver_criminal_background_checked =
      selectedCriminalCheckOption;
  }, [
    selectedLanguages,
    selectedTime,
    selectedInternetOption,
    selectedVehicleOption,
    selectedPhoneOption,
    selectedExperienceOption,
    selectedCriminalCheckOption,
  ]);

  const handleCheckBackground = async () => {
    dispatchAppLocalData?.setIsLoading(
      true,
      language.SIGN_UP_EXTRA_SCREEN.CHECKING_RECORD
    );
    const res = await backgroundCheck({
      customerName: signUpLocalData?.localData?.first_name || '',
      email: signUpLocalData?.localData?.email || '',
      language: selectedLanguages.join(','),
    });
    if (res.code === 200) {
      handleSignUp(res.inquiryId.id);
    } else {
      snackbar?.showSnackBar(res.message, 'error');
      dispatchAppLocalData?.setIsLoading(false);
    }
  };

  const handleSignUp = async (inquiryId: string) => {
    dispatchAppLocalData?.setIsLoading(
      true,
      language.SIGN_UP_EXTRA_SCREEN.CREATING_ACCOUNT
    );
    const extraData = {
      fullname:
        signUpLocalData?.localData?.first_name +
        ' ' +
        signUpLocalData?.localData?.last_name,
      driver_speak_languages: selectedLanguages,
      driver_availability: selectedTime,
      driver_internet_plan: selectedInternetOption,
      driver_has_vehicle: selectedVehicleOption,
      driver_phone_type: selectedPhoneOption === 'Android' ? 'A' : 'I',
      driver_legal_canada: 'Yes',
      is_first_delivery_experience: selectedExperienceOption,
      driver_criminal_background_checked: selectedCriminalCheckOption,
      backgroundCheckId: inquiryId,
    };

    if (signUpLocalData?.localData) {
      const res = await signUp({...signUpLocalData?.localData, ...extraData});

      if (res.code === 200) {
        dispatchAppLocalData?.setIsLoading(false);
        navigate(LOGGED_OUT_ROUTES.DOCUMENT_UPLOAD, {
          auth: res.result as TAuth,
        });
      } else {
        dispatchAppLocalData?.setIsLoading(false);
        snackbar?.showSnackBar(res.message, 'error');
      }
    }
  };

  return (
    <CommonScreenContainer
      screenTitleProps={{
        title: language.SIGN_UP_EXTRA_SCREEN.TITLE,
        showBackButton: true,
        paddingHorizontal: COMMONLY_USED_DATA.SCREEN_PADDING,
      }}>
      <Typography fontWeight="500">
        {language.SIGN_UP_EXTRA_SCREEN.ALMOST_THERE}
      </Typography>
      <Typography fontWeight="400">
        {language.SIGN_UP_EXTRA_SCREEN.JUST_ANSWER}
      </Typography>
      <Spacer height={20} />
      <View style={styles.listContainer}>
        <UserExtraInfoContainer
          selectedLanguages={selectedLanguages}
          setSelectedLanguages={setSelectedLanguages}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          selectedInternetOption={selectedInternetOption}
          setSelectedInternetOption={setSelectedInternetOption}
          selectedVehicleOption={selectedVehicleOption}
          setSelectedVehicleOption={setSelectedVehicleOption}
          selectedPhoneOption={selectedPhoneOption}
          setSelectedPhoneOption={setSelectedPhoneOption}
          selectedExperienceOption={selectedExperienceOption}
          setSelectedExperienceOption={setSelectedExperienceOption}
          selectedCriminalCheckOption={selectedCriminalCheckOption}
          setSelectedCriminalCheckOption={setSelectedCriminalCheckOption}
          applyLanguageValue
        />
        <Button
          variant="fillRounded"
          title={language.COMMON_TEXTS.SUBMIT}
          backgroundColor={theme.PRIMARY}
          textColor={theme.OPPOSITE_OF_ACCENT}
          disabled={selectedCriminalCheckOption === 'No'}
          onPress={handleCheckBackground}
        />
      </View>
    </CommonScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    gap: 30,
    paddingBottom: 20,
  },
});
