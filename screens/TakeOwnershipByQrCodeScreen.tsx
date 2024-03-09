import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import {ScreenProps} from '../types/ScreenProps';
import {HomeStackParamList} from '../types/stacksParamsList';
import ScreenTitle from '../components/common/ScreenTitle';
import {useHomeNavigatorContext} from '../contexts/hooks/useHomeNavigatorContext';
import {LOGGED_IN_ROUTES} from '../constants/ROUTES';
import useUpcomingJobContext from '../contexts/hooks/useAcceptedJobContext';
import {TUpcomingJob} from '../types/jobs';
import TakeOwnershipJobDetails from '../components/TakeOwnershipJobDetails';
import Typography from '../components/common/Typography';
import Spacer from '../components/common/Spacer';
import Button from '../components/Button';
import useCustomTheme from '../hooks/useCustomTheme';
import useDispatchAppLocalData from '../contexts/hooks/useDispatchAppLocalData';
import useTakeOwnership from '../APIs/hooks/useTakeOwnership';
import useAcceptedJobDispatchContext from '../contexts/hooks/useAcceptedJobDispatchContext';
import useSnackBarSetContext from '../contexts/hooks/useSnackBarLoadingContext';
import useAuth from '../contexts/hooks/useAuth';
import NoTaskField from '../components/NoTaskField';
import useLanguage from '../hooks/useLanguage';

type TFilteredJob = {
  businessId: string;
  job: TUpcomingJob | undefined;
};

type TProps = ScreenProps<HomeStackParamList, 'TakeOwnershipByQrCode'>;

const TakeOwnershipByQrCodeScreen = (props: TProps) => {
  const language = useLanguage();
  const theme = useCustomTheme();
  const {job_id} = props.route.params;
  const homeContext = useHomeNavigatorContext();
  const upcomingJobContext = useUpcomingJobContext();
  const [finding, setFinding] = useState<TFilteredJob | undefined>();

  const dispatchAppLocalData = useDispatchAppLocalData();
  const takeOwnership = useTakeOwnership();
  const acceptedJobDispatchContext = useAcceptedJobDispatchContext();
  const snackBar = useSnackBarSetContext();
  const auth = useAuth();

  const handleTakeOwnership = async () => {
    dispatchAppLocalData?.setIsLoading(true);
    if (auth?._id && finding) {
      const res = await takeOwnership({
        driver_id: auth?._id,
        user_id: finding.businessId,
        job_id,
      });
      if (res.code === 200) {
        acceptedJobDispatchContext?.fetchAcceptedJobList();
        dispatchAppLocalData?.setIsLoading(false);
        snackBar?.showSnackBar(res.message, 'success');
      } else {
        dispatchAppLocalData?.setIsLoading(false);
        snackBar?.showSnackBar(res.message, 'error');
      }
    } else {
      snackBar?.showSnackBar(
        language.COMMON_TEXTS.SOMETHING_WENT_WRONG,
        'error'
      );
    }
  };

  const findTheJob = () => {
    const jobList = upcomingJobContext?.acceptedJobList;
    let findingValue: TFilteredJob | undefined;

    jobList?.forEach(item => {
      const find = item.jobs.find(job => job._id === job_id);

      findingValue = {
        businessId: item.business.id,
        job: find,
      };
    });
    setFinding(findingValue);
  };

  useEffect(() => {
    findTheJob();
  }, []);

  return (
    <NonScrollableScreenContainer paddingVertical={0.001}>
      <ScreenTitle
        backScreen={homeContext?.activeRoute || LOGGED_IN_ROUTES.HOME}
        title={language.TAKE_OWNERSHIP_SCREEN.TITLE}
        showBackButton
      />
      {finding?.job ? (
        <View style={styles.container}>
          <Spacer height={100} />
          <Typography textAlign="center" fontSize={16} fontWeight="600">
            {language.TAKE_OWNERSHIP_SCREEN.JOB_DETAILS}
          </Typography>
          <Spacer height={20} />

          <TakeOwnershipJobDetails job={finding?.job} />
          <Spacer height={20} />
          <Button
            variant="fillRounded"
            textColor="#fff"
            title={language.TAKE_OWNERSHIP_SCREEN.TAKE_OWNERSHIP}
            backgroundColor={theme.PRIMARY}
            onPress={handleTakeOwnership}
          />
        </View>
      ) : (
        <NoTaskField text={language.TAKE_OWNERSHIP_SCREEN.NOT_FOUND} />
      )}
    </NonScrollableScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default TakeOwnershipByQrCodeScreen;
