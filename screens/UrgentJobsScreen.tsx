import {View, StyleSheet} from 'react-native';
import React from 'react';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import HomeHeader from '../components/HomeScreen/HomeHeader';
import HomeTopButtonGroup from '../components/HomeScreen/HomeTopButtonGroup';
import UrgentJobList from '../components/HomeScreen/UrgentJobList';
import Spacer from '../components/common/Spacer';
import {useHomeNavigatorContextDispatch} from '../contexts/hooks/useHomeNavigatorContext';
import {useFocusEffect} from '@react-navigation/native';
import {LOGGED_IN_ROUTES} from '../constants/ROUTES';
import useLanguage from '../hooks/useLanguage';

const UrgentJobsScreen = () => {
  const dispatchHomeContext = useHomeNavigatorContextDispatch();
  const language = useLanguage();

  useFocusEffect(() => {
    dispatchHomeContext?.setActiveRoute(LOGGED_IN_ROUTES.URGENT_JOBS);
  });
  return (
    <NonScrollableScreenContainer
      paddingVertical={0.001}
      paddingHorizontal={0.001}>
      <HomeHeader title={language.URGENT_JOBS_SCREEN.TITLE} variant="Others" />
      <HomeTopButtonGroup />
      <Spacer height={10} />
      <View style={styles.container}>
        <UrgentJobList />
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

export default UrgentJobsScreen;
