import {useContext} from 'react';
import {SignUpLocalDataContext} from '../SignUpLocalDataContext';

const useSignupFormDataContext = () => {
  const context = useContext(SignUpLocalDataContext);
  return context;
};

export default useSignupFormDataContext;
