import React from 'react';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import HomeHeader from '../components/HomeScreen/HomeHeader';
import useDispatchAppLocalData from '../contexts/hooks/useDispatchAppLocalData';
import useSnackBarSetContext from '../contexts/hooks/useSnackBarLoadingContext';
import useTakeOwnershipAll from '../APIs/hooks/useTakeOwnershipAll';
import useTakeOwnership from '../APIs/hooks/useTakeOwnership';
import useAcceptedJobDispatchContext from '../contexts/hooks/useAcceptedJobDispatchContext';
import useUpcomingJobContext from '../contexts/hooks/useAcceptedJobContext';
import JobList from '../components/common/JobList';
import {useHomeNavigatorContextDispatch} from '../contexts/hooks/useHomeNavigatorContext';
import {useFocusEffect} from '@react-navigation/native';
import {LOGGED_IN_ROUTES} from '../constants/ROUTES';
import useLanguage from '../hooks/useLanguage';

export default function TaskJobsScreen() {
  const language = useLanguage();
  const dispatchAppLocalData = useDispatchAppLocalData();
  const snackBar = useSnackBarSetContext();
  const takeOwnershipAll = useTakeOwnershipAll();
  const takeOwnership = useTakeOwnership();
  const taskJobsContext = useUpcomingJobContext();
  const taskJobDispatchContext = useAcceptedJobDispatchContext();

  const dispatchHomeContext = useHomeNavigatorContextDispatch();

  const handleTakeOwnership = async (
    driver_id: string,
    job_id: string,
    pharmacy_id?: string
  ) => {
    dispatchAppLocalData?.setIsLoading(true);
    if (pharmacy_id) {
      const res = await takeOwnership({
        driver_id,
        user_id: pharmacy_id,
        job_id,
      });
      if (res.code === 200) {
        taskJobDispatchContext?.fetchAcceptedJobList();
        dispatchAppLocalData?.setIsLoading(false);
        snackBar?.showSnackBar(res.message, 'success');
      } else {
        dispatchAppLocalData?.setIsLoading(false);
        snackBar?.showSnackBar(res.message, 'error');
      }
    } else {
      snackBar?.showSnackBar(language.TASK_JOBS_SCREEN.ID_NOT_FOUND, 'error');
    }
  };
  const handleTakeOwnershipAll = async (
    driver_id: string,
    pharmacy_id: string
  ) => {
    dispatchAppLocalData?.setIsLoading(true);
    const res = await takeOwnershipAll({driver_id, user_id: pharmacy_id});
    if (res.code === 200) {
      taskJobDispatchContext?.fetchAcceptedJobList();
      dispatchAppLocalData?.setIsLoading(false);
      snackBar?.showSnackBar(res.message, 'success');
    } else {
      dispatchAppLocalData?.setIsLoading(false);
      snackBar?.showSnackBar(res.message, 'error');
    }
  };

  useFocusEffect(() => {
    dispatchHomeContext?.setActiveRoute(LOGGED_IN_ROUTES.TASK_JOBS);
  });
  return (
    <NonScrollableScreenContainer
      paddingVertical={0.001}
      paddingHorizontal={0.001}>
      <HomeHeader variant="Others" title={language.TASK_JOBS_SCREEN.TITLE} />
      <JobList
        loading={taskJobsContext?.loading || false}
        onRefresh={taskJobDispatchContext?.fetchAcceptedJobList}
        jobs={taskJobsContext?.taskJobList || []}
        buttonType="Take Ownership"
        onAccept={handleTakeOwnership}
        onAcceptAll={handleTakeOwnershipAll}
        emptyMessage={language.TASK_JOBS_SCREEN.EMPTY}
      />
    </NonScrollableScreenContainer>
  );
}
