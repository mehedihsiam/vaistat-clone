import React, {useEffect, useState} from 'react';
import {TNotification, TNotifications} from '../types/notifications';
import useAuth from './hooks/useAuth';
import {useGetNotifications} from '../APIs/hooks/useNotifications';
import useSnackBarSetContext from './hooks/useSnackBarLoadingContext';
import messaging from '@react-native-firebase/messaging';
import useCustomNavigate from '../hooks/useCustomNavigate';
import {LOGGED_IN_ROUTES} from '../constants/ROUTES';

type TNotificationContext = {
  notifications: TNotifications;
  fetchNotifications: () => void;
  loading: boolean;
  notificationCount: number;
};

type Props = {
  children: React.ReactNode;
};

export const NotificationContext =
  React.createContext<TNotificationContext | null>(null);

export default function NotificationArea(props: Props) {
  const [notifications, setNotifications] = React.useState<TNotifications>([]);
  const [notificationCount, setNotificationCount] = React.useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);
  const auth = useAuth();
  const getNotifications = useGetNotifications();
  const snackbar = useSnackBarSetContext();
  const {navigate} = useCustomNavigate();

  const fetchNotifications = async () => {
    if (auth?._id) {
      setLoading(true);
      const res = await getNotifications({
        driver_id: auth._id,
        pageNumber: '1',
      });
      if (res.code === 200) {
        setNotifications(res.result);
        setNotificationCount(
          res.result.filter((item: TNotification) => item.status === false)
            .length
        );
        setLoading(false);
      } else {
        setLoading(false);
        snackbar?.showSnackBar(res.message, 'error');
      }
    }
  };

  const handleReceiveNotifications = async () => {
    messaging().setBackgroundMessageHandler(async () => {
      await fetchNotifications();
      navigate(LOGGED_IN_ROUTES.NOTIFICATION);
    });
    messaging().getInitialNotification();
  };

  const handleReceiveNotificationsForeground = async () => {
    messaging().onMessage(async _message => {
      await fetchNotifications();
    });
  };

  const values = {
    notifications,
    fetchNotifications,
    loading,
    notificationCount,
  };

  useEffect(() => {
    fetchNotifications();
  }, [auth?._id]);

  useEffect(() => {
    handleReceiveNotifications();
  }, []);

  useEffect(() => {
    handleReceiveNotificationsForeground();
  }, []);

  return (
    <NotificationContext.Provider value={values}>
      {props.children}
    </NotificationContext.Provider>
  );
}
