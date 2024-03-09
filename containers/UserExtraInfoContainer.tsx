import React, {Fragment} from 'react';
import SignUpInfoListCheckbox from '../components/SignUpExtraInfoScreen/SignUpInfoListCheckbox';
import {
  languages,
  languages_values,
  phone_options,
  time_frames,
  yn_options,
} from '../data/signUpExtraInfo';
import RadioOptions from '../components/common/RadioOptions';
import {TSetState} from '../types/setStateType';
import useLanguage from '../hooks/useLanguage';

type TUserExtraInfoContainer = {
  applyLanguageValue?: boolean;
  selectedLanguages: string[];
  setSelectedLanguages: TSetState<string[]>;
  selectedTime: string[];
  setSelectedTime: TSetState<string[]>;
  selectedInternetOption: string;
  setSelectedInternetOption: TSetState<string>;
  selectedVehicleOption: string;
  setSelectedVehicleOption: TSetState<string>;
  selectedPhoneOption: string;
  setSelectedPhoneOption: TSetState<string>;
  selectedExperienceOption: string;
  setSelectedExperienceOption: TSetState<string>;
  selectedCriminalCheckOption: string;
  setSelectedCriminalCheckOption: TSetState<string>;
};

const radioGap = 10;

export default function UserExtraInfoContainer(props: TUserExtraInfoContainer) {
  const language = useLanguage();
  const {
    selectedLanguages,
    setSelectedLanguages,
    selectedTime,
    setSelectedTime,
    selectedInternetOption,
    setSelectedInternetOption,
    selectedVehicleOption,
    setSelectedVehicleOption,
    selectedPhoneOption,
    setSelectedPhoneOption,
    selectedExperienceOption,
    setSelectedExperienceOption,
    selectedCriminalCheckOption,
    setSelectedCriminalCheckOption,
  } = props;
  return (
    <Fragment>
      <SignUpInfoListCheckbox
        title={language.SIGN_UP_EXTRA_SCREEN.WHICH_LANGUAGES}
        list={languages}
        selectedItems={selectedLanguages}
        setSelectedItems={setSelectedLanguages}
        values={props.applyLanguageValue ? languages_values : undefined}
      />
      <SignUpInfoListCheckbox
        title={language.SIGN_UP_EXTRA_SCREEN.WHEN_ARE_YOU_AVAILABLE}
        list={time_frames}
        selectedItems={selectedTime}
        setSelectedItems={setSelectedTime}
      />
      <RadioOptions
        title={language.SIGN_UP_EXTRA_SCREEN.DO_YOU_HAVE_INTERNET}
        options={yn_options}
        selectedOption={selectedInternetOption}
        setSelectedOption={setSelectedInternetOption}
        gap={radioGap}
      />
      <RadioOptions
        title={language.SIGN_UP_EXTRA_SCREEN.DO_YOU_HAVE_VEHICLE}
        options={yn_options}
        selectedOption={selectedVehicleOption}
        setSelectedOption={setSelectedVehicleOption}
        gap={radioGap}
      />
      <RadioOptions
        title={language.SIGN_UP_EXTRA_SCREEN.WHAT_TYPE_PHONE}
        options={phone_options}
        selectedOption={selectedPhoneOption}
        setSelectedOption={setSelectedPhoneOption}
        gap={radioGap}
      />
      <RadioOptions
        title={language.SIGN_UP_EXTRA_SCREEN.IS_FIRST_DELIVERY_EXPERIENCE}
        options={yn_options}
        selectedOption={selectedExperienceOption}
        setSelectedOption={setSelectedExperienceOption}
        gap={radioGap}
      />
      <RadioOptions
        title={language.SIGN_UP_EXTRA_SCREEN.CRIMINAL_RECORD}
        options={yn_options}
        selectedOption={selectedCriminalCheckOption}
        setSelectedOption={setSelectedCriminalCheckOption}
        gap={radioGap}
      />
    </Fragment>
  );
}
