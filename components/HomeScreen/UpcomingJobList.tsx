import React from 'react';
import JobList from '../common/JobList';
import useDispatchAppLocalData from '../../contexts/hooks/useDispatchAppLocalData';
import useSnackBarSetContext from '../../contexts/hooks/useSnackBarLoadingContext';
import useAcceptJob from '../../APIs/hooks/useAcceptJob';
import useAcceptAllJob from '../../APIs/hooks/useAcceptAllJob';
import useUpcomingJobContext from '../../contexts/hooks/useAcceptedJobContext';
import useAcceptedJobDispatchContext from '../../contexts/hooks/useAcceptedJobDispatchContext';
import useLanguage from '../../hooks/useLanguage';

export default function UpcomingJobList() {
  const language = useLanguage();
  const dispatchAppLocalData = useDispatchAppLocalData();
  const acceptJob = useAcceptJob();
  const acceptJobAll = useAcceptAllJob();
  const snackBar = useSnackBarSetContext();
  const upcomingJob = useUpcomingJobContext();
  const upcomingJobDispatch = useAcceptedJobDispatchContext();

  const onAccept = async (driver_id: string, job_id: string) => {
    dispatchAppLocalData?.setIsLoading(true);
    const res = await acceptJob({driver_id, job_id});
    if (res.code === 200) {
      upcomingJobDispatch?.fetchAcceptedJobList();
      dispatchAppLocalData?.setIsLoading(false);
      snackBar?.showSnackBar(res.message, 'success');
    } else {
      dispatchAppLocalData?.setIsLoading(false);
      snackBar?.showSnackBar(res.message, 'error');
    }
  };
  const onAcceptAll = async (driver_id: string, pharmacy_id: string) => {
    dispatchAppLocalData?.setIsLoading(true);
    const res = await acceptJobAll({driver_id, user_id: pharmacy_id});
    if (res.code === 200) {
      upcomingJobDispatch?.fetchAcceptedJobList();
      dispatchAppLocalData?.setIsLoading(false);
      snackBar?.showSnackBar(res.message, 'success');
    } else {
      dispatchAppLocalData?.setIsLoading(false);
      snackBar?.showSnackBar(res.message, 'error');
    }
  };

  return (
    <JobList
      loading={upcomingJob?.loading || false}
      buttonType="Accept"
      emptyMessage={language.UPCOMING_JOBS_SCREEN.NO_JOBS}
      onAccept={onAccept}
      onAcceptAll={onAcceptAll}
      jobs={upcomingJob?.upcomingJobList || []}
      onRefresh={upcomingJobDispatch?.fetchAcceptedJobList}
    />
  );
}
