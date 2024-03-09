import React, {createContext, useCallback} from 'react';
import storage from '../utils/storage';

type TDispatch = {
  setToken: (token: string) => void;
  removeToken: () => void;
};

export const TokenContext = createContext<string | null>(null);
export const TokenSetContext = createContext<TDispatch | undefined>(undefined); // for setting state

type Props = {
  children: React.ReactNode;
};

export default function TokenArea(props: Props) {
  const [tokenState, setTokenState] = React.useState<string | null>(null);

  const dispatch = {
    setToken: async (data: string) => {
      setTokenState(data);
      await storage.set('token', JSON.stringify(data));
    },
    removeToken: async () => {
      setTokenState(null);
      await storage.remove('token');
    },
  };

  const fetchToken = useCallback(async () => {
    const token = await storage.get('token');
    if (token) {
      setTokenState(token);
    }
  }, []);

  React.useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  return (
    <TokenContext.Provider value={tokenState}>
      <TokenSetContext.Provider value={dispatch}>
        {props.children}
      </TokenSetContext.Provider>
    </TokenContext.Provider>
  );
}
