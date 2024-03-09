import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {LOGGED_OUT_ROUTES} from '../constants/ROUTES';
import AccountDocumentUploadScreen from '../screens/AccountDocumentUploadScreen';
import ForgetPassword from '../screens/ForgetPasswordScreen';
import LoginScreen from '../screens/LoginScreen';
import OtpScreen from '../screens/OtpScreen';
import PhoneVerificationScreen from '../screens/PhoneVerificationScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SignUpExtraInfoScreen from '../screens/SignUpExtraInfoScreen';
import {LoggedOutStackParamList} from '../types/stacksParamsList';
import SignUpLocalDataArea from '../contexts/SignUpLocalDataContext';
import OnboardingScreen from '../screens/OnBoardScreen';
import LicenseDetailsScreen from '../screens/LicenseDetailsScreen';

export default function LoggedOutNavigator() {
  const Stack = createNativeStackNavigator<LoggedOutStackParamList>();

  return (
    <SignUpLocalDataArea>
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        <Stack.Screen name={LOGGED_OUT_ROUTES.LOGIN} component={LoginScreen} />
        <Stack.Screen
          name={LOGGED_OUT_ROUTES.REGISTER}
          component={RegisterScreen}
        />
        <Stack.Screen
          name={LOGGED_OUT_ROUTES.FORGET_PASSWORD}
          component={ForgetPassword}
        />
        <Stack.Screen
          name={LOGGED_OUT_ROUTES.PHONE_VERIFICATION}
          component={PhoneVerificationScreen}
        />
        <Stack.Screen name={LOGGED_OUT_ROUTES.OTP} component={OtpScreen} />
        <Stack.Screen
          name={LOGGED_OUT_ROUTES.DOCUMENT_UPLOAD}
          component={AccountDocumentUploadScreen}
        />
        <Stack.Screen
          name={LOGGED_OUT_ROUTES.SIGN_UP_EXTRA_INFO}
          component={SignUpExtraInfoScreen}
        />
        <Stack.Screen
          name={LOGGED_OUT_ROUTES.ON_BOARDING}
          component={OnboardingScreen}
        />
        <Stack.Screen
          name={LOGGED_OUT_ROUTES.LICENSE_DETAILS}
          component={LicenseDetailsScreen}
        />
      </Stack.Navigator>
    </SignUpLocalDataArea>
  );
}
