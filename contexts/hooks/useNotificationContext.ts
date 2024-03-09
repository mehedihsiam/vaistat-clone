import {useContext} from 'react';
import {NotificationContext} from '../NotificationContext';

const useNotificationContext = () => {
  return useContext(NotificationContext);
};

export default useNotificationContext;
