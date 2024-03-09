import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LOGGED_IN_ROUTES} from '../constants/ROUTES';
import HomeNavigatorArea from '../contexts/HomeNavigatorContext';
import ActiveJobsScreen from '../screens/ActiveJobsScreen';
import HomeScreen from '../screens/HomeScreen';
import TaskJobsScreen from '../screens/TaskJobsScreen';
import AcceptedJobsScreen from '../screens/AcceptedJobsScreen';
import {HomeStackParamList} from '../types/stacksParamsList';
import UpcomingJobArea from '../contexts/UpcomingJobContext';
import ActiveJobArea from '../contexts/ActiveJobContext';
import TakeOwnershipByQrCodeScreen from '../screens/TakeOwnershipByQrCodeScreen';
import UrgentJobArea from '../contexts/UrgentJobContext';
import UpcomingJobsScreen from '../screens/UpcomingJobsScreen';
import UrgentJobsScreen from '../screens/UrgentJobsScreen';

export default function HomeNavigator() {
  const Stack = createNativeStackNavigator<HomeStackParamList>();
  return (
    <UpcomingJobArea>
      <ActiveJobArea>
        <UrgentJobArea>
          <HomeNavigatorArea>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
              }}>
              <Stack.Screen
                name={LOGGED_IN_ROUTES.HOME}
                component={HomeScreen}
              />
              <Stack.Screen
                name={LOGGED_IN_ROUTES.ACCEPTED_JOBS}
                component={AcceptedJobsScreen}
              />
              <Stack.Screen
                name={LOGGED_IN_ROUTES.ACTIVE_JOBS}
                component={ActiveJobsScreen}
              />
              <Stack.Screen
                name={LOGGED_IN_ROUTES.TASK_JOBS}
                component={TaskJobsScreen}
              />
              <Stack.Screen
                name={LOGGED_IN_ROUTES.TAKE_OWNERSHIP_BY_QR_CODE}
                component={TakeOwnershipByQrCodeScreen}
              />
              <Stack.Screen
                name={LOGGED_IN_ROUTES.UPCOMING_JOBS}
                component={UpcomingJobsScreen}
              />
              <Stack.Screen
                name={LOGGED_IN_ROUTES.URGENT_JOBS}
                component={UrgentJobsScreen}
              />
            </Stack.Navigator>
          </HomeNavigatorArea>
        </UrgentJobArea>
      </ActiveJobArea>
    </UpcomingJobArea>
  );
}
