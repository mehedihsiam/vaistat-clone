import React from 'react';
import ProfilePhoto from '../common/ProfilePhoto';
import placeholder from '../../assets/placeholders/user-placeholder.png';
import InputWithLabel from '../common/InputWithLabel';
import useAuth from '../../contexts/hooks/useAuth';
import {useFormik} from 'formik';
import signUpExtraInfo, {
  phone_options,
  yn_options,
} from '../../data/signUpExtraInfo';
import UserExtraInfoContainer from '../../containers/UserExtraInfoContainer';
import useCustomNavigate from '../../hooks/useCustomNavigate';

import EditProfileComponentContainer from './EditProfileComponentContainer';
import ConfirmCancelButtonComb from '../common/ConfirmCancelButtonComb';
import useDispatchAppLocalData from '../../contexts/hooks/useDispatchAppLocalData';
import useEditProfile, {
  TEditProfilePayload,
} from '../../APIs/hooks/useEditProfile';
import useSnackBarSetContext from '../../contexts/hooks/useSnackBarLoadingContext';
import {TYesOrNo} from '../../types/yesNo';
import useAuthDispatch from '../../contexts/hooks/useAuthDispatch';
import useLanguage from '../../hooks/useLanguage';

type TFormData = {
  email: string;
  first_name: string;
  last_name: string;
};

export default function EditPersonalData() {
  const language = useLanguage();
  const auth = useAuth();
  const dispatchAuth = useAuthDispatch();
  const dispatchLocalData = useDispatchAppLocalData();
  const editProfile = useEditProfile();
  const snackBar = useSnackBarSetContext();
  const {goBack} = useCustomNavigate();

  const [selectedLanguages, setSelectedLanguages] = React.useState<string[]>(
    auth?.driver_speak_languages || []
  );
  const [selectedTime, setSelectedTime] = React.useState<string[]>(
    auth?.driver_availability || []
  );
  const [selectedInternetOption, setSelectedInternetOption] =
    React.useState<string>(auth?.driver_internet_plan || yn_options[0]);
  const [selectedVehicleOption, setSelectedVehicleOption] =
    React.useState<string>(auth?.driver_has_vehicle || yn_options[0]);
  const [selectedPhoneOption, setSelectedPhoneOption] = React.useState<string>(
    phone_options[0]
  );
  const [selectedExperienceOption, setSelectedExperienceOption] =
    React.useState<string>(auth?.is_first_delivery_experience || yn_options[0]);
  const [selectedCriminalCheckOption, setSelectedCriminalCheckOption] =
    React.useState<string>(
      auth?.driver_criminal_background_checked || yn_options[0]
    );

  const handleSave = async (values: TFormData) => {
    if (auth?._id) {
      dispatchLocalData?.setIsLoading(true);
      const cleanedObject: TEditProfilePayload = {
        driver_id: auth._id,
        fullname: `${values.first_name} ${values.last_name}`,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        driver_availability: selectedTime,
        driver_criminal_background_checked:
          selectedCriminalCheckOption as TYesOrNo,
        driver_has_vehicle: selectedVehicleOption as TYesOrNo,
        driver_internet_plan: selectedInternetOption as TYesOrNo,
        driver_legal_canada: selectedExperienceOption as TYesOrNo,
        driver_phone_type: selectedPhoneOption,
        driver_speak_languages: selectedLanguages,
        is_first_delivery_experience: selectedExperienceOption as TYesOrNo,
      };
      const res = await editProfile(cleanedObject);

      if (res.code === 200) {
        dispatchAuth(res.result);
        dispatchLocalData?.setIsLoading(false);
        snackBar?.showSnackBar(res.message, 'success');
      } else {
        dispatchLocalData?.setIsLoading(false);
        snackBar?.showSnackBar(res.message, 'error');
      }
    }
  };

  const handleCancel = () => {
    goBack();
  };

  const formik = useFormik({
    initialValues: {
      email: auth?.email || '',
      first_name: auth?.first_name || '',
      last_name: auth?.last_name || '',
      mobile_no: auth?.mobile_no || '',
    },
    onSubmit: values => {
      handleSave(values);
    },
  });

  const {values, handleChange} = formik;

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

  return (
    <EditProfileComponentContainer>
      <ProfilePhoto
        image={auth?.profile_img ? {uri: auth?.profile_img} : placeholder}
      />
      <InputWithLabel
        keyboardType="default"
        hideLeftIcon
        label={language.EDIT_PROFILE_SCREEN.EMAIL}
        value={values.email}
        onChangeText={handleChange('email')}
        editable={false}
      />
      <InputWithLabel
        keyboardType="default"
        hideLeftIcon
        label={language.EDIT_PROFILE_SCREEN.FIRST_NAME}
        value={values.first_name}
        onChangeText={handleChange('first_name')}
        editable={false}
      />
      <InputWithLabel
        keyboardType="default"
        hideLeftIcon
        label={language.EDIT_PROFILE_SCREEN.LAST_NAME}
        value={values.last_name}
        onChangeText={handleChange('last_name')}
        editable={false}
      />

      <UserExtraInfoContainer
        applyLanguageValue
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
      />
      <ConfirmCancelButtonComb
        onCancel={handleCancel}
        onSubmit={formik.handleSubmit}
      />
    </EditProfileComponentContainer>
  );
}
