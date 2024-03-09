import {useContext} from 'react';
import {TokenSetContext} from '../TokenContext';

const useSetToken = () => {
  const dispatch = useContext(TokenSetContext);
  return dispatch;
};

export default useSetToken;
