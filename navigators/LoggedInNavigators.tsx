import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LOGGED_IN_ROUTES} from '../constants/ROUTES';
import AppNotificationScreen from '../screens/AppNotificationScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import ConfirmDeleteProfileScreen from '../screens/ConfirmDeleteProfileScreen';
import DeleteProfileScreen from '../screens/DeleteProfileScreen';
import EmailNotificationScreen from '../screens/EmailNotificationScreen';
import JobDetailsScreen from '../screens/JobDetailsScreen';
import NotificationSettingsScreen from '../screens/NotificationSettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PushNotificationScreen from '../screens/PushNotificationScreen';
import QrCodeScanScreen from '../screens/QrCodeScanScreen';
import ReadyDeliveryScreen from '../screens/ReadyDeliveryScreen';
import ScanBarcode from '../screens/ScanBarcode';
import SessionsSummaryScreen from '../screens/SessionsSummaryScreen';
import {LoggedInStackParamList} from '../types/stacksParamsList';
import HomeNavigator from './HomeNavigator';
import OrderDeliveryScreen from '../screens/OrderDeliveryScreen';
import AddSignatureScreen from '../screens/AddSignatureScreen';
import NotDeliveredScreen from '../screens/NotDeliveredScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ChatExportScreen from '../screens/ChatExportScreen';
import PaymentHistoryScreen from '../screens/PaymentHistoryScreen';
import FilterArea from '../contexts/FilterContext';
import ProfileReportsScreen from '../screens/ProfileReportsScreen';
import NotificationArea from '../contexts/NotificationContext';
import PaymentScreen from '../screens/PaymentScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileReportViewScreen from '../screens/ProfileReportViewScreen';
import AvailableDriversScreen from '../screens/AvailableDriversScreen';
import TransferredJobScreen from '../screens/TransferredJobScreen';

export default function LoggedInNavigator() {
  const Stack = createNativeStackNavigator<LoggedInStackParamList>();

  return (
    <NotificationArea>
      <FilterArea>
        <Stack.Navigator
          screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
          <Stack.Screen
            name={LOGGED_IN_ROUTES.HOME_STACK}
            component={HomeNavigator}
          />
          <Stack.Screen
            name={LOGGED_IN_ROUTES.CHANGE_PASSWORD}
            component={ChangePasswordScreen}
          />

          <Stack.Screen
            name={LOGGED_IN_ROUTES.NOTIFICATION}
            component={NotificationsScreen}
          />
          <Stack.Screen
            name={LOGGED_IN_ROUTES.DELETE_ACCOUNT}
            component={DeleteProfileScreen}
          />
          <Stack.Screen
            name={LOGGED_IN_ROUTES.APP_NOTIFICATION}
            component={AppNotificationScreen}
          />
          <Stack.Screen
            name={LOGGED_IN_ROUTES.EMAIL_NOTIFICATION}
            component={EmailNotificationScreen}
          />
          <Stack.Screen
            name={LOGGED_IN_ROUTES.NOTIFICATION_SETTINGS}
            component={NotificationSettingsScreen}
          />
          <Stack.Screen
            name={LOGGED_IN_ROUTES.PUSH_NOTIFICATION}
            component={PushNotificationScreen}
          />
          <Stack.Screen
            name={LOGGED_IN_ROUTES.CONFIRM_DELETE_ACCOUNT}
            component={ConfirmDeleteProfileScreen}
          />
          <Stack.Screen
            name={LOGGED_IN_ROUTES.SESSIONS_SUMMARY}
            component={SessionsSummaryScreen}
          />
          <Stack.Screen
            name={LOGGED_IN_ROUTES.SCAN_QR_CODE}
            component={QrCodeScanScreen}
          />
          <Stack.Screen
            name={LOGGED_IN_ROUTES.SCAN_BARCODE}
            component={ScanBarcode}
          />
          <Stack.Screen
            name={LOGGED_IN_ROUTES.JOB_DETAILS}
            component={JobDetailsScreen}
          />
          <Stack.Screen
            name={LOGGED_IN_ROUTES.READY_DELIVERY}
            component={ReadyDeliveryScreen}
          />
          <Stack.Screen
            name={LOGGED_IN_ROUTES.ORDER_DELIVERY}
            component={OrderDeliveryScreen}
          />
          <Stack.Screen
            name={LOGGED_IN_ROUTES.ADD_SIGNATURE}
            component={AddSignatureScreen}
          />
          <Stack.Screen
            name={LOGGED_IN_ROUTES.NOT_DELIVERED}
            component={NotDeliveredScreen}
          />
          <Stack.Screen
            name={LOGGED_IN_ROUTES.EDIT_PROFILE}
            component={EditProfileScreen}
          />
          <Stack.Screen
            name={LOGGED_IN_ROUTES.PROFILE}
            component={ProfileScreen}
          />
          <Stack.Screen
            name={LOGGED_IN_ROUTES.CHAT_EXPORT}
            component={ChatExportScreen}
          />
          <Stack.Screen
            name={LOGGED_IN_ROUTES.PAYMENT_HISTORY}
            component={PaymentHistoryScreen}
          />
          <Stack.Screen
            name={LOGGED_IN_ROUTES.PROFILE_REPORTS}
            component={ProfileReportsScreen}
          />
          <Stack.Screen
            name={LOGGED_IN_ROUTES.PAYMENT}
            component={PaymentScreen}
          />
          <Stack.Screen
            name={LOGGED_IN_ROUTES.REPORT_VIEW}
            component={ProfileReportViewScreen}
          />
          <Stack.Screen name={LOGGED_IN_ROUTES.CHAT} component={ChatScreen} />
          <Stack.Screen
            name={LOGGED_IN_ROUTES.AVAILABLE_DRIVERS}
            component={AvailableDriversScreen}
          />
          <Stack.Screen
            name={LOGGED_IN_ROUTES.TRANSFERRED_JOB}
            component={TransferredJobScreen}
          />
        </Stack.Navigator>
      </FilterArea>
    </NotificationArea>
  );
}
