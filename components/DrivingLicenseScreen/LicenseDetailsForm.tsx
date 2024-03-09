import {StyleSheet, View} from 'react-native';
import React from 'react';
import {TLicenseInformation} from '../../types/licenseInformation';
import DateInput from '../common/DateInput';
import Spacer from '../common/Spacer';
import SelectInput from '../common/SelectInput';
import useLanguage from '../../hooks/useLanguage';
import FlexRowBetween from '../common/FlexRowBetween';
import InputWithLabel from '../common/InputWithLabel';

type TLicenseDetailsForm = {
  values: TLicenseInformation;
  onChangeText: (name: keyof TLicenseInformation, value: string) => void;
  dob: Date;
  issueDate: Date;
  expiryDate: Date;
  setDob: (date: Date) => void;
  setIssueDate: (date: Date) => void;
  setExpiryDate: (date: Date) => void;
};

const LicenseDetailsForm = (props: TLicenseDetailsForm) => {
  const language = useLanguage();
  const {values, onChangeText} = props;

  const GENDER_OPTIONS = [
    {
      label: language.LICENSE_DETAILS_SCREEN.MALE,
      value: 'M',
    },
    {
      label: language.LICENSE_DETAILS_SCREEN.FEMALE,
      value: 'F',
    },
    {
      label: language.COMMON_TEXTS.OTHERS,
      value: 'O',
    },
  ];

  const getGenderLabel = () => {
    const label = GENDER_OPTIONS.filter(
      option => option.value === values.sex
    )[0]?.label;
    return label;
  };

  return (
    <View style={styles.container}>
      <InputWithLabel
        label={language.LICENSE_DETAILS_SCREEN.FULL_NAME}
        hideLeftIcon
        value={values.fullName}
        onChangeText={(text: string) => onChangeText('fullName', text)}
      />
      <Spacer height={20} />

      <SelectInput
        selectedOption={getGenderLabel()}
        setSelectedOption={(value: string) => onChangeText('sex', value)}
        optionsShowingPosition="bottom"
        label={language.LICENSE_DETAILS_SCREEN.SEX}
        options={GENDER_OPTIONS}
      />

      <Spacer height={20} />
      <InputWithLabel
        label={language.LICENSE_DETAILS_SCREEN.ADDRESS}
        hideLeftIcon
        value={values.address}
        onChangeText={(text: string) => onChangeText('address', text)}
      />
      <Spacer height={20} />

      <InputWithLabel
        label={language.LICENSE_DETAILS_SCREEN.LICENSE_TYPE}
        hideLeftIcon
        value={values.licenseType}
        onChangeText={(text: string) => onChangeText('licenseType', text)}
      />

      <Spacer height={20} />

      <InputWithLabel
        label={language.LICENSE_DETAILS_SCREEN.LICENSE_NUMBER}
        hideLeftIcon
        value={values.licenseNumber}
        onChangeText={(text: string) => onChangeText('licenseNumber', text)}
      />
      <Spacer height={20} />
      <DateInput
        date={props.dob}
        label={language.LICENSE_DETAILS_SCREEN.DATE_OF_BIRTH}
        setDate={props.setDob}
      />
      <Spacer height={20} />
      <FlexRowBetween gap={20}>
        <DateInput
          date={props.issueDate}
          label={language.LICENSE_DETAILS_SCREEN.ISSUE_DATE}
          setDate={props.setIssueDate}
        />

        <DateInput
          date={props.expiryDate}
          label={language.LICENSE_DETAILS_SCREEN.EXPIRY_DATE}
          setDate={props.setExpiryDate}
        />
      </FlexRowBetween>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
});

export default LicenseDetailsForm;
