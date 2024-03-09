import {useContext} from 'react';

import {LocationDispatchContext} from '../LocationContext';

const useDispatchLocationContext = () => {
  const context = useContext(LocationDispatchContext);
  return context;
};

export default useDispatchLocationContext;
