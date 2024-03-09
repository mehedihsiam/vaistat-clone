import React, {createContext, useEffect} from 'react';
import {TAuth} from '../types/auth';
import storage from '../utils/storage';
import JSON_KEYS from '../constants/JSON_KEYS';
import {TLoginData} from '../APIs/hooks/useLogin';

import useLoginSubmission from '../hooks/useLoginSubmission';
import useDeviceToken from './hooks/useDeviceToken';

type TDispatch = (auth: TAuth | null) => void;

export const AuthContext = createContext<TAuth | null>(null);
export const AuthDispatchContext = createContext<TDispatch>(() => {}); // for setting state

type Props = {
  children: React.ReactNode;
};

export default function AuthArea(props: Props) {
  const [auth, setAuth] = React.useState<TAuth | null>(null);
  const [credential, setCredential] = React.useState<TLoginData | null>(null);
  const handleLogin = useLoginSubmission();
  const device_token = useDeviceToken();

  const dispatch = async (data: TAuth | null) => {
    setAuth(data);
    if (!data) {
      await storage.remove(JSON_KEYS.AUTH_CREDENTIALS);
    }
  };

  const fetchLocalCredentials = async () => {
    const credentialRes = await storage.get(JSON_KEYS.AUTH_CREDENTIALS);

    if (credentialRes) {
      const credentialResJson = JSON.parse(credentialRes || '{}');
      setCredential(credentialResJson);
    }
  };

  const fetchAuth = async () => {
    if (credential && device_token?.deviceToken) {
      const res = await handleLogin(credential);
      setAuth(res);
    }
  };

  useEffect(() => {
    fetchLocalCredentials();
  }, []);

  useEffect(() => {
    fetchAuth();
  }, [credential, device_token?.deviceToken]);

  return (
    <AuthContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={dispatch}>
        {props.children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}
