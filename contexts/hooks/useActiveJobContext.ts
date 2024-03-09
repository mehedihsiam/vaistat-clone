import {useContext} from 'react';

import {ActiveJobContext} from '../ActiveJobContext';

const useActiveJobContext = () => {
  const token = useContext(ActiveJobContext);
  return token;
};

export default useActiveJobContext;
