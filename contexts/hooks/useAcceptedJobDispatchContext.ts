import {useContext} from 'react';

import {UpcomingJobDispatchContext} from '../UpcomingJobContext';

const useAcceptedJobDispatchContext = () => {
  const token = useContext(UpcomingJobDispatchContext);
  return token;
};

export default useAcceptedJobDispatchContext;
