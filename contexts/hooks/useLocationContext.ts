import {useContext} from 'react';

import {LocationContext} from '../LocationContext';

const useLocationContext = () => {
  const context = useContext(LocationContext);
  return context;
};

export default useLocationContext;
