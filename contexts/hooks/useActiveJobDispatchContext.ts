import {useContext} from 'react';

import {ActiveJobDispatchContext} from '../ActiveJobContext';

const useActiveJobDispatchContext = () => {
  const token = useContext(ActiveJobDispatchContext);
  return token;
};

export default useActiveJobDispatchContext;
