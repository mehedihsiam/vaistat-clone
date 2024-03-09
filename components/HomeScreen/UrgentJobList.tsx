import React, {Fragment} from 'react';
import JobList from '../common/JobList';
import useUrgentJobContext from '../../contexts/hooks/useUrgentJobContext';
import useUrgentJobDispatchContext from '../../contexts/hooks/useUrgentJobDispatchContext';
import useDispatchAppLocalData from '../../contexts/hooks/useDispatchAppLocalData';
import useAcceptJob from '../../APIs/hooks/useAcceptJob';
import useAcceptAllJob from '../../APIs/hooks/useAcceptAllJob';
import useSnackBarSetContext from '../../contexts/hooks/useSnackBarLoadingContext';
import useLanguage from '../../hooks/useLanguage';

export default function UrgentJobList() {
  const language = useLanguage();
  const urgentJobList = useUrgentJobContext();
  const dispatchUrgentJobList = useUrgentJobDispatchContext();
  const dispatchAppLocalData = useDispatchAppLocalData();
  const acceptJob = useAcceptJob();
  const acceptJobAll = useAcceptAllJob();
  const snackBar = useSnackBarSetContext();

  const onAccept = async (driver_id: string, job_id: string) => {
    dispatchAppLocalData?.setIsLoading(true);
    const res = await acceptJob({driver_id, job_id});
    if (res.code === 200) {
      dispatchUrgentJobList?.fetchJobList();
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
      dispatchUrgentJobList?.fetchJobList();
      dispatchAppLocalData?.setIsLoading(false);
      snackBar?.showSnackBar(res.message, 'success');
    } else {
      dispatchAppLocalData?.setIsLoading(false);
      snackBar?.showSnackBar(res.message, 'error');
    }
  };

  return (
    <Fragment>
      <JobList
        loading={urgentJobList?.loading || false}
        buttonType="Accept"
        emptyMessage={language.URGENT_JOBS_SCREEN.NO_URGENT_JOBS}
        onAccept={onAccept}
        onAcceptAll={onAcceptAll}
        jobs={urgentJobList?.jobList || []}
        onRefresh={dispatchUrgentJobList?.fetchJobList(true)}
      />
    </Fragment>
  );
}
