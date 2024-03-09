import React, {Fragment, useState} from 'react';
import {LOGGED_IN_ROUTES} from '../constants/ROUTES';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import HomeHeader from '../components/HomeScreen/HomeHeader';
import {useHomeNavigatorContextDispatch} from '../contexts/hooks/useHomeNavigatorContext';
import {useFocusEffect} from '@react-navigation/native';
import ActiveJobList from '../components/ActiveJobsScreen/ActiveJobList';
import CompletedJobButton from '../components/ActiveJobsScreen/CompletedJobButton';
import useGetCompletedJobList from '../APIs/hooks/useGetCompletedJobList';
import {TActiveJob} from '../types/activeJobs';
import useAuth from '../contexts/hooks/useAuth';
import CompletedJobList from '../components/ActiveJobsScreen/CompletedJobList';
import useSnackBarSetContext from '../contexts/hooks/useSnackBarLoadingContext';
import useLanguage from '../hooks/useLanguage';

export default function ActiveJobsScreen() {
  const language = useLanguage();
  const auth = useAuth();
  const snackBar = useSnackBarSetContext();
  const [renderedComponent, setRenderedComponent] = React.useState<
    'Active' | 'Completed'
  >('Active');
  const [fetchingCompletedJobs, setFetchingCompletedJobs] = useState(false);
  const getCompletedJobs = useGetCompletedJobList();

  const dispatchHomeContext = useHomeNavigatorContextDispatch();
  const [completedJobList, setCompletedJobList] = useState<TActiveJob[]>([]);

  const fetchCompletedJobList = async () => {
    if (completedJobList.length > 0) {
      setRenderedComponent(
        renderedComponent === 'Active' ? 'Completed' : 'Active'
      );
    } else {
      if (auth?._id) {
        const res = await getCompletedJobs({driver_id: auth?._id, page: 1});
        if (res?.code === 200) {
          setCompletedJobList(res.result);
          setFetchingCompletedJobs(false);
          setRenderedComponent(
            renderedComponent === 'Active' ? 'Completed' : 'Active'
          );
        } else {
          setFetchingCompletedJobs(false);

          snackBar?.showSnackBar(res?.message, 'error');
        }
      }
    }
  };

  const handleToggleComponent = () => {
    if (completedJobList.length < 1) {
      setFetchingCompletedJobs(true);
    }
    fetchCompletedJobList();
  };

  const getTitle = () => {
    switch (renderedComponent) {
      case 'Active':
        return language.ACTIVE_JOBS_SCREEN.TITLE;
      case 'Completed':
        return language.ACTIVE_JOBS_SCREEN.COMPLETED_JOBS;
      default:
        return language.ACTIVE_JOBS_SCREEN.TITLE;
    }
  };

  useFocusEffect(() => {
    dispatchHomeContext?.setActiveRoute(LOGGED_IN_ROUTES.ACTIVE_JOBS);
  });

  return (
    <Fragment>
      {renderedComponent === 'Active' ? (
        <CompletedJobButton
          onPress={handleToggleComponent}
          loading={fetchingCompletedJobs}
        />
      ) : null}
      <NonScrollableScreenContainer
        paddingVertical={0.001}
        paddingHorizontal={0.001}>
        <HomeHeader variant="Others" title={getTitle()} />

        {renderedComponent === 'Completed' ? (
          <CompletedJobList
            setRenderedComponent={setRenderedComponent}
            jobList={completedJobList}
          />
        ) : renderedComponent === 'Active' ? (
          <ActiveJobList />
        ) : null}
      </NonScrollableScreenContainer>
    </Fragment>
  );
}
