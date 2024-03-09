import {useContext} from 'react';
import {HomeScreenContext} from '../HomeScreenContext';

const useHomeScreenContext = () => {
  const context = useContext(HomeScreenContext);
  return context;
};

export default useHomeScreenContext;
