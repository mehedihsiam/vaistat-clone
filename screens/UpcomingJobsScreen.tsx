import {View, StyleSheet} from 'react-native';
import React from 'react';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import UpcomingJobList from '../components/HomeScreen/UpcomingJobList';
import HomeHeader from '../components/HomeScreen/HomeHeader';
import HomeTopButtonGroup from '../components/HomeScreen/HomeTopButtonGroup';
import Spacer from '../components/common/Spacer';
import {useHomeNavigatorContextDispatch} from '../contexts/hooks/useHomeNavigatorContext';
import {LOGGED_IN_ROUTES} from '../constants/ROUTES';
import {useFocusEffect} from '@react-navigation/native';
import useLanguage from '../hooks/useLanguage';

const UpcomingJobsScreen = () => {
  const language = useLanguage();
  const dispatchHomeContext = useHomeNavigatorContextDispatch();

  useFocusEffect(() => {
    dispatchHomeContext?.setActiveRoute(LOGGED_IN_ROUTES.UPCOMING_JOBS);
  });
  return (
    <NonScrollableScreenContainer
      paddingVertical={0.001}
      paddingHorizontal={0.001}>
      <HomeHeader
        title={language.UPCOMING_JOBS_SCREEN.TITLE}
        variant="Others"
      />
      <HomeTopButtonGroup />
      <Spacer height={10} />
      <View style={styles.container}>
        <UpcomingJobList />
      </View>
    </NonScrollableScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default UpcomingJobsScreen;
