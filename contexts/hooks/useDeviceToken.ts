import {useContext} from 'react';
import {DeviceTokenContext} from '../DeviceTokenContext';

const useDeviceToken = () => {
  const token = useContext(DeviceTokenContext);
  return token;
};

export default useDeviceToken;
