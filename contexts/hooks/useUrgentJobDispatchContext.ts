import {useContext} from 'react';
import {UrgentJobDispatchContext} from '../UrgentJobContext';

const useUrgentJobDispatchContext = () => {
  const token = useContext(UrgentJobDispatchContext);
  return token;
};

export default useUrgentJobDispatchContext;
