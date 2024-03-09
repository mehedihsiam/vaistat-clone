import {useContext} from 'react';
import {UrgentJobContext} from '../UrgentJobContext';

const useUrgentJobContext = () => {
  const token = useContext(UrgentJobContext);
  return token;
};

export default useUrgentJobContext;
