import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';

type TDeviceTokenContext = {
  deviceToken: string | null;
};

type Props = {
  children: React.ReactNode;
};

export const DeviceTokenContext =
  React.createContext<TDeviceTokenContext | null>(null);

export default function DeviceTokenArea(props: Props) {
  const [deviceToken, setDeviceToken] = useState<string | null>(null);

  const getDeviceToken = async () => {
    try {
      const token = await messaging().getToken();
      setDeviceToken(token);
    } catch (error) {
      console.log('Messaging token fetching error', error);
    }
  };

  const values = {
    deviceToken,
  };

  useEffect(() => {
    getDeviceToken();
  }, []);

  return (
    <DeviceTokenContext.Provider value={values}>
      {props.children}
    </DeviceTokenContext.Provider>
  );
}
