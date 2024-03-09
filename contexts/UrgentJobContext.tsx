import React, {createContext, useEffect, useState} from 'react';
import useAuth from './hooks/useAuth';
import useSnackBarSetContext from './hooks/useSnackBarLoadingContext';
import {useGetUrgentJobDriver} from '../APIs/hooks/useUrgentJobDriver';
import {TJobsPharmacyList} from '../types/jobs';

type TDispatch = {
  fetchJobList: (refreshing?: boolean) => () => Promise<void>;
};

type TValues = {
  jobList: TJobsPharmacyList;
  count: number;
  loading: boolean;
};

export const UrgentJobContext = createContext<TValues | undefined>(undefined);
export const UrgentJobDispatchContext = createContext<TDispatch | undefined>(
  undefined
); // for setting state

type Props = {
  children: React.ReactNode;
};

export default function UrgentJobArea(props: Props) {
  const auth = useAuth();

  const getUrgentJobs = useGetUrgentJobDriver();
  const snackBar = useSnackBarSetContext();

  const [loading, setLoading] = useState(false);
  const [jobList, setJobList] = useState<TJobsPharmacyList>([]);
  const [count, setCount] = useState(0);

  const jobGetFn = (refreshing?: boolean) => async () => {
    if (auth?._id) {
      setLoading(refreshing ? true : false);
      const data = await getUrgentJobs({driver_id: auth?._id});
      if (data?.result) {
        setJobList(data.result);
        setCount(data.result.length);
        setLoading(false);
      } else {
        setLoading(false);

        snackBar?.showSnackBar(`Urgent Jobs Error: ${data.message}`, 'error');
      }
    } else {
      snackBar?.showSnackBar('Please login first', 'error');
    }
  };

  useEffect(() => {
    if (auth?._id) {
      jobGetFn(true);
    }
  }, [auth?._id]);

  const values = {
    jobList,
    count,
    loading,
  };

  const dispatch = {
    fetchJobList: jobGetFn,
  };

  return (
    <UrgentJobContext.Provider value={values}>
      <UrgentJobDispatchContext.Provider value={dispatch}>
        {props.children}
      </UrgentJobDispatchContext.Provider>
    </UrgentJobContext.Provider>
  );
}
