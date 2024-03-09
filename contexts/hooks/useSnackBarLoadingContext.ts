import {useContext} from 'react';
import {SnackBarSetContext} from '../SnackBarContext';

const useSnackBarSetContext = () => {
  return useContext(SnackBarSetContext);
};

export default useSnackBarSetContext;
