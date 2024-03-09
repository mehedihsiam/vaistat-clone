import React, {createContext, useEffect, useState} from 'react';
import {TJobsPharmacyList, TUpcomingJob} from '../types/jobs';
import useAuth from './hooks/useAuth';
import {useGetUpcomingJobs} from '../APIs/hooks/useUpcomingJobs';
import useSnackBarSetContext from './hooks/useSnackBarLoadingContext';

type TDispatch = {
  fetchAcceptedJobList: () => Promise<void>;
};

type TAcceptedJobContext = {
  acceptedJobList: TJobsPharmacyList;
  acceptedJobListWithoutBusiness: TUpcomingJob[];
  upcomingJobList: TJobsPharmacyList;
  taskJobList: TJobsPharmacyList;
  acceptedCount: number;
  upcomingCount: number;
  taskCount: number;
  loading: boolean;
};

export const UpcomingJobContext = createContext<
  TAcceptedJobContext | undefined
>(undefined);
export const UpcomingJobDispatchContext = createContext<TDispatch | undefined>(
  undefined
); // for setting state

type Props = {
  children: React.ReactNode;
};

export default function UpcomingJobArea(props: Props) {
  const auth = useAuth();
  const getUpcomingJobs = useGetUpcomingJobs();
  const snackBar = useSnackBarSetContext();

  const [loading, setLoading] = useState(false);
  const [upcomingJobList, setUpcomingJobList] = useState<TJobsPharmacyList>([]);
  const [acceptedJobList, setAcceptedJobList] = useState<TJobsPharmacyList>([]);
  const [acceptedJobListWithoutBusiness, setAcceptedJobListWithoutBusiness] =
    useState<TUpcomingJob[]>([]);
  const [taskJobList, setTaskJobList] = useState<TJobsPharmacyList>([]);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);

  const filterUpcomingJobs = (data: TJobsPharmacyList) => {
    const filtered: TJobsPharmacyList = [];
    let count = 0;
    data.forEach(item => {
      const filteredJobs = item.jobs.filter(
        job =>
          new Date(job.job_date).toDateString() === new Date().toDateString() &&
          job.isAccepted === false
      );
      const object = {
        business: item.business,
        jobs: filteredJobs,
      };
      count += filteredJobs.length;
      filtered.push(object);
    });
    setUpcomingCount(count);
    setUpcomingJobList(filtered.filter(item => item.jobs.length > 0));
  };
  const filterTaskJobs = (data: TJobsPharmacyList) => {
    const filtered: TJobsPharmacyList = [];
    let count = 0;
    data.forEach(item => {
      const filteredJobs = item.jobs.filter(
        job =>
          new Date(job.job_date).toDateString() === new Date().toDateString() &&
          job.isAccepted === false &&
          job.jobFor === ('2' || '3')
      );
      const object = {
        business: item.business,
        jobs: filteredJobs,
      };
      count += filteredJobs.length;
      filtered.push(object);
    });
    setTaskCount(count);
    setTaskJobList(filtered.filter(item => item.jobs.length > 0));
  };

  const filterAcceptedJobs = (data: TJobsPharmacyList) => {
    const filtered: TJobsPharmacyList = [];
    let count = 0;
    data.forEach(item => {
      const filteredJobs = item.jobs.filter(
        job =>
          new Date(job.job_date).toDateString() === new Date().toDateString() &&
          job.isAccepted === true
      );
      const object = {
        business: item.business,
        jobs: filteredJobs,
      };
      count += filteredJobs.length;
      setAcceptedJobListWithoutBusiness((prev: TUpcomingJob[]) => [
        ...prev,
        ...filteredJobs,
      ]);
      filtered.push(object);
    });
    setAcceptedCount(count);
    setAcceptedJobList(filtered.filter(item => item.jobs.length > 0));
  };

  const jobGetFn = async () => {
    if (auth?._id) {
      const res = await getUpcomingJobs({driver_id: auth?._id});

      if (res?.code === 200) {
        filterUpcomingJobs(res.upcomingJobsRequest);
        filterAcceptedJobs(res.upcomingJobsRequest);
        filterTaskJobs(res.upcomingJobsRequest);
      } else {
        snackBar?.showSnackBar(`Upcoming Jobs Error: ${res?.message}`, 'error');
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?._id) {
      jobGetFn();
    }
  }, [auth?._id]);

  const values = {
    acceptedJobList,
    acceptedJobListWithoutBusiness,
    upcomingJobList,
    taskJobList,
    taskCount,
    acceptedCount,
    upcomingCount,
    loading,
  };

  const dispatch = {
    fetchAcceptedJobList: jobGetFn,
  };

  return (
    <UpcomingJobContext.Provider value={values}>
      <UpcomingJobDispatchContext.Provider value={dispatch}>
        {props.children}
      </UpcomingJobDispatchContext.Provider>
    </UpcomingJobContext.Provider>
  );
}
