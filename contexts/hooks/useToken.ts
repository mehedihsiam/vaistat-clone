import {useContext} from 'react';
import {TokenContext} from '../TokenContext';

const useAuthToken = () => {
  const token = useContext(TokenContext);
  return token;
};

export default useAuthToken;
