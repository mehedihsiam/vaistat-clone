import {StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import ScreenTitle from '../components/common/ScreenTitle';
import Typography from '../components/common/Typography';
import Button from '../components/Button';
import useCustomTheme from '../hooks/useCustomTheme';
import DocUploadButton from '../components/DocumentUploadScreen/DocUploadButton';

import {LoggedOutStackParamList} from '../types/stacksParamsList';
import {LOGGED_OUT_ROUTES} from '../constants/ROUTES';
import accountVerificationInitialData from '../data/AccountVerificationInitialData';
import useDocumentUpload from '../APIs/hooks/useDocumentUpload';
import useCustomNavigate from '../hooks/useCustomNavigate';
import {ScreenProps} from '../types/ScreenProps';
import useDispatchAppLocalData from '../contexts/hooks/useDispatchAppLocalData';
import useSnackBarSetContext from '../contexts/hooks/useSnackBarLoadingContext';

type Props = ScreenProps<LoggedOutStackParamList, 'DocumentUpload'>;

export default function AccountDocumentUploadScreen(props: Props) {
  const theme = useCustomTheme();
  const dispatchLocalAppData = useDispatchAppLocalData();
  const snackBarContext = useSnackBarSetContext();
  const data = accountVerificationInitialData;

  const [isValid, setIsValid] = React.useState(false);
  const [count, setCount] = React.useState(0); // to trace the data change
  const {navigate} = useCustomNavigate();
  const auth = props.route.params.auth;

  const docUpload = useDocumentUpload();

  const handleSubmit = async () => {
    if (isValid) {
      dispatchLocalAppData?.setIsLoading(true, 'Uploading Documents...');
      const documentsToUpload = {
        driver_id: auth._id,
        driver_license: data.license.image,
        motor_insurance: data.insurance.image,
        registeration_certificate: data.registration.image,
        profile_img: data.profile.image,
      };
      /**
       * Validation has been done in line 53
       */
      // @ts-ignore
      const res = await docUpload(documentsToUpload);
      if (res.code === 200) {
        navigate(LOGGED_OUT_ROUTES.ON_BOARDING, {auth});
      } else {
        snackBarContext?.showSnackBar('Something went wrong', 'error');
      }
      dispatchLocalAppData?.setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const allUploaded = Object.keys(data).every(
      key => data[key].image !== undefined
    );

    setIsValid(allUploaded);
  }, [data, count]);

  return (
    <NonScrollableScreenContainer>
      <ScreenTitle title="Account Verification" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.contentContainer}>
        <Typography fontWeight="500">
          {/* Welcome {`${auth.first_name} ${auth.last_name}`} */} Changeable
        </Typography>
        <Typography fontSize={14} fontWeight="400">
          Please Upload Your Document for account verification
        </Typography>
        {Object.keys(data).map(key => (
          <DocUploadButton
            accountVerificationInitialDataObjectKey={key}
            title={data[key].title}
            key={key}
            setCount={setCount}
          />
        ))}
      </ScrollView>
      <Button
        variant="fillRounded"
        title="Submit"
        backgroundColor={theme.PRIMARY}
        textColor={theme.OPPOSITE_OF_ACCENT}
        disabled={!isValid}
        onPress={handleSubmit}
      />
    </NonScrollableScreenContainer>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingVertical: 10,
  },
});
