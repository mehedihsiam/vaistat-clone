import {useContext} from 'react';
import {AuthDispatchContext} from '../AuthContext';

const useAuthDispatch = () => {
  const dispatch = useContext(AuthDispatchContext);
  return dispatch;
};

export default useAuthDispatch;
