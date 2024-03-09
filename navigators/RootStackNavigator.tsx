import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ROOT_ROUTES} from '../constants/ROUTES';
import MainAppContainer from '../containers/MainAppContainer';
import FaqScreen from '../screens/FaqScreen';
import SplashScreen from '../screens/SplashScreen';
import TermsAndConditionsScreen from '../screens/TermsAndConditionsScreen';
import {RootStackParamList} from '../types/stacksParamsList';

export default function RootStackNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen
        name={ROOT_ROUTES.SPLASH}
        component={SplashScreen}
        options={{animation: 'fade'}}
      />
      <Stack.Screen
        name={ROOT_ROUTES.TERMS_AND_CONDITIONS}
        component={TermsAndConditionsScreen}
      />
      <Stack.Screen name={ROOT_ROUTES.FAQ} component={FaqScreen} />
      <Stack.Screen name={ROOT_ROUTES.MAIN_APP} component={MainAppContainer} />
    </Stack.Navigator>
  );
}
