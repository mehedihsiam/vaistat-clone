import {useContext} from 'react';
import {DataDispatchContext} from '../AppLocalDataContext';

const useDispatchAppLocalData = () => {
  const dispatchLocalData = useContext(DataDispatchContext);
  return dispatchLocalData;
};

export default useDispatchAppLocalData;
