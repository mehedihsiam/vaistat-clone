import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import EditDocumentButton from './EditDocumentButton';
import Spacer from '../common/Spacer';
import useAuth from '../../contexts/hooks/useAuth';
import useCriminalBackgroundCheckStatus from '../../APIs/hooks/useCriminalBackgroundCheckStatus';
import useSnackBarSetContext from '../../contexts/hooks/useSnackBarLoadingContext';
import useLanguage from '../../hooks/useLanguage';

type TDocumentStatus = {
  status: string;
  label: string;
};

export default function EditDocuments() {
  const language = useLanguage();
  const auth = useAuth();
  const checkStatus = useCriminalBackgroundCheckStatus();
  const [backgroundStatus, setBackgroundStatus] = React.useState<
    string | undefined
  >('Checking...');
  const snackBarContext = useSnackBarSetContext();

  const fetchBackgroundStatus = async () => {
    if (auth?.backgroundCheckId) {
      const res = await checkStatus({
        backgroundCheckId: auth.backgroundCheckId,
      });
      if (res.code === 200) {
        setBackgroundStatus(res.result?.status);
      } else {
        snackBarContext?.showSnackBar(res.message, 'error');
      }
    }
  };

  const getStatus = (statusCode: string | undefined) => {
    switch (statusCode) {
      case '0':
        return language.EDIT_PROFILE_SCREEN.UPLOADED;

      case '1':
        return language.EDIT_PROFILE_SCREEN.VERIFIED;

      case '2':
        return language.EDIT_PROFILE_SCREEN.UNVERIFIED;

      default:
        return language.EDIT_PROFILE_SCREEN.UPLOADED;
    }
  };

  const documents: TDocumentStatus[] = [
    {
      status: getStatus(auth?.profile_img_status),
      label: language.EDIT_PROFILE_SCREEN.PROFILE_PHOTO,
    },
    {
      status: getStatus(auth?.driver_license_status),
      label: language.EDIT_PROFILE_SCREEN.DRIVER_LICENSE,
    },
    {
      status: getStatus(auth?.motor_insurance_status),
      label: language.EDIT_PROFILE_SCREEN.MOTOR_INSURANCE,
    },
    {
      status: getStatus(auth?.registeration_certificate_status),
      label: language.EDIT_PROFILE_SCREEN.REGISTRATION,
    },
    {
      status: backgroundStatus || language.EDIT_PROFILE_SCREEN.CHECKING,
      label: language.EDIT_PROFILE_SCREEN.BACKGROUND_CHECK,
    },
  ];

  useEffect(() => {
    fetchBackgroundStatus();
  }, [auth?.backgroundCheckId]);

  return (
    <View style={styles.container}>
      <Spacer height={16} />
      {documents.map((document, index) => (
        <EditDocumentButton key={index} {...document} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
