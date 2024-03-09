import {useContext} from 'react';
import {HomeScreenContextDispatch} from '../HomeScreenContext';

const useHomeScreenContextDispatch = () => {
  const context = useContext(HomeScreenContextDispatch);
  return context;
};

export default useHomeScreenContextDispatch;
