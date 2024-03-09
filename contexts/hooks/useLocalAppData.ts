import {useContext} from 'react';
import {DataContext} from '../AppLocalDataContext';

const useLocalAppData = () => {
  const localData = useContext(DataContext);
  return localData;
};

export default useLocalAppData;
