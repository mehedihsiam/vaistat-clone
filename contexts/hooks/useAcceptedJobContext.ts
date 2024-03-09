import {useContext} from 'react';

import {UpcomingJobContext} from '../UpcomingJobContext';

const useUpcomingJobContext = () => {
  const token = useContext(UpcomingJobContext);
  return token;
};

export default useUpcomingJobContext;
