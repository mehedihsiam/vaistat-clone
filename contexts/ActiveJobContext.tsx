import React, {createContext, useEffect, useState} from 'react';
import useAuth from './hooks/useAuth';
import useSnackBarSetContext from './hooks/useSnackBarLoadingContext';
import useGetActiveJobList from '../APIs/hooks/useGetActiveJobList';
import {TActiveJob} from '../types/activeJobs';

type TDispatch = {
  fetchJobList: () => Promise<void>;
};

type TActiveJobContext = {
  jobList: TActiveJob[];
  count: number;
  loading: boolean;
};

export const ActiveJobContext = createContext<TActiveJobContext | undefined>(
  undefined
);
export const ActiveJobDispatchContext = createContext<TDispatch | undefined>(
  undefined
); // for setting state

type Props = {
  children: React.ReactNode;
};

export default function ActiveJobArea(props: Props) {
  const auth = useAuth();

  const getActiveJobs = useGetActiveJobList();
  const snackBar = useSnackBarSetContext();

  const [loading, setLoading] = useState(false);
  const [jobList, setJobList] = useState<TActiveJob[]>([]);

  const jobGetFn = async () => {
    setLoading(true);
    if (auth?._id) {
      const data = await getActiveJobs({driver_id: auth?._id});
      if (data.code === 200) {
        setJobList(data.result);
        setLoading(false);
      } else {
        setLoading(false);
        snackBar?.showSnackBar(data.message, 'error');
      }
    }
  };

  useEffect(() => {
    jobGetFn();
  }, [auth?._id]);

  const values = {
    jobList,
    count: jobList.length,
    loading,
  };

  const dispatch = {
    fetchJobList: jobGetFn,
  };

  return (
    <ActiveJobContext.Provider value={values}>
      <ActiveJobDispatchContext.Provider value={dispatch}>
        {props.children}
      </ActiveJobDispatchContext.Provider>
    </ActiveJobContext.Provider>
  );
}
