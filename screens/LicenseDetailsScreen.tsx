import {ScrollView} from 'react-native';
import React, {Fragment, useState} from 'react';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import ScreenTitle from '../components/common/ScreenTitle';
import useLanguage from '../hooks/useLanguage';
import {Asset} from 'react-native-image-picker';
import FilePickingModal from '../components/common/FilePickingModal';
import Spacer from '../components/common/Spacer';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import {useFormik} from 'formik';
import LicenseDetailsForm from '../components/DrivingLicenseScreen/LicenseDetailsForm';
import {TLicenseInformation} from '../types/licenseInformation';
import LicenseImage from '../components/DrivingLicenseScreen/LicenseImage';
import useDispatchAppLocalData from '../contexts/hooks/useDispatchAppLocalData';
import useSignupFormDataContext from '../contexts/hooks/useSignupFormDataContext';
import useCustomNavigate from '../hooks/useCustomNavigate';
import Button from '../components/Button';
import useCustomTheme from '../hooks/useCustomTheme';
import {LOGGED_OUT_ROUTES} from '../constants/ROUTES';

const LicenseDetailsScreen = () => {
  const theme = useCustomTheme();
  const {navigate} = useCustomNavigate();
  const dispatchLocalAppData = useDispatchAppLocalData();
  const signupFormDataContext = useSignupFormDataContext();
  const language = useLanguage();
  const [openImagePicker, setOpenImagePicker] = useState(false);
  const [image, setImage] = useState<Asset | undefined>();
  const [dob, setDob] = useState(new Date());
  const [issueDate, setIssueDate] = useState(new Date());
  const [expiredDate, setExpiredDate] = useState(new Date());

  const formik = useFormik({
    initialValues: {
      fullName: '',
      dob,
      sex: '',
      address: '',
      licenseType: '',
      licenseNumber: '',
      issueDate,
      expiredDate,
    },
    onSubmit: values => {
      const data = {
        ...values,
        dob,
        issueDate,
        expiredDate,
      };
      const prevData = signupFormDataContext?.localData;
      if (prevData) {
        signupFormDataContext?.setLocalData({
          ...prevData,
          driverLicenseInfo: data,
        });
        navigate(LOGGED_OUT_ROUTES.SIGN_UP_EXTRA_INFO);
      }
    },
  });

  const extractText = (text: string) => {
    if (text.startsWith('Sexe')) {
      formik.setFieldValue('sex', text.split(':')[1].trim());
    }
    if (text.startsWith('Valide le')) {
      const foundIssueDate = text.split('Valide le')[1].split(' ')[1].trim();
      const foundExpiryDate = text.split('Expire le')[1].trim();

      const convertedIssueDate = new Date(foundIssueDate);
      const convertedExpiryDate = new Date(foundExpiryDate);

      setIssueDate(convertedIssueDate);
      setExpiredDate(convertedExpiryDate);
    }
    if (text.startsWith('Date de naissance')) {
      const foundDob = text.split(':')[1].trim();
      const convertedDob = new Date(foundDob);
      setDob(convertedDob);
    }
    if (text.includes('Permis')) {
      formik.setFieldValue('licenseType', text.trim());
    }
  };

  const recognizeText = async (asset: Asset) => {
    // eslint-disable-next-line no-useless-escape
    const addressRegex = /^[0-9]+[A-Za-z0-9\s\.,#\-]*$/;
    if (asset) {
      dispatchLocalAppData?.setIsLoading(
        true,
        language.LICENSE_DETAILS_SCREEN.RECOGNIZING_LICENSE_DETAILS
      );
      let firstLetterOfLicenseNumber: string = '';
      const result = await TextRecognition.recognize(asset.uri!);

      for (let block of result.blocks) {
        if (block.text.includes('Permis')) {
          const text = block.lines[1].text;
          firstLetterOfLicenseNumber = text[0];
          formik.setFieldValue('licenseNumber', text.trim());
        }
        if (
          block.text.startsWith(firstLetterOfLicenseNumber) &&
          block.lines.length > 1
        ) {
          const firstName = block.lines[1].text;
          const lastName = block.lines[0].text;
          formik.setFieldValue('fullName', `${firstName} ${lastName}`);
        }

        if (
          block.text.match(addressRegex) &&
          block.text === block.text.toUpperCase()
        ) {
          formik.setFieldValue('address', block.text);
        }

        for (let line of block.lines) {
          extractText(line.text);
        }
      }
      dispatchLocalAppData?.setIsLoading(false);
    }
  };

  const handleGetImage = async (asset: Asset | undefined) => {
    setImage(asset);
    if (asset) {
      recognizeText(asset);
    }
  };

  const handleChangeText = (name: keyof TLicenseInformation, value: string) => {
    formik.setFieldValue(name, value);
  };

  return (
    <Fragment>
      {openImagePicker ? (
        <FilePickingModal
          handleGetImage={handleGetImage}
          modalVisible={openImagePicker}
          setModalVisible={setOpenImagePicker}
        />
      ) : null}
      <NonScrollableScreenContainer paddingVertical={0.001}>
        <ScreenTitle title={language.LICENSE_DETAILS_SCREEN.TITLE} />
        <ScrollView>
          <LicenseImage setOpenPicker={setOpenImagePicker} image={image} />
          <Spacer height={20} />
          <LicenseDetailsForm
            values={formik.values}
            onChangeText={handleChangeText}
            dob={dob}
            issueDate={issueDate}
            expiryDate={expiredDate}
            setDob={setDob}
            setIssueDate={setIssueDate}
            setExpiryDate={setExpiredDate}
          />
          <Spacer height={20} />
          <Button
            variant="fillRounded"
            title={language.COMMON_TEXTS.NEXT}
            onPress={formik.handleSubmit}
            backgroundColor={theme.PRIMARY}
            textColor={theme.OPPOSITE_OF_ACCENT}
            disabled={!formik.values.licenseNumber}
          />

          <Spacer height={20} />
        </ScrollView>
      </NonScrollableScreenContainer>
    </Fragment>
  );
};

export default LicenseDetailsScreen;
