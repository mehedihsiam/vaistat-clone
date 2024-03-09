import React, {createContext} from 'react';
import {ActivityIndicator} from 'react-native';

import ModalContainer from '../containers/ModalContainer';
import Typography from '../components/common/Typography';
import useCustomTheme from '../hooks/useCustomTheme';

type TLocalData = {
  isVisitedSplashScreen: boolean;

  currentSignature?: string | null;
  loading?: boolean;
};

const defaultData: TLocalData = {
  isVisitedSplashScreen: false,
};

type TDispatch = {
  setIsVisitedSplashScreen: (arg: boolean) => void;

  setIsLoading: (isLoading: boolean, message?: string) => void;
  setCurrentSignature: (signature: string | null) => void;
};

export const DataContext = createContext<TLocalData>(defaultData);
export const DataDispatchContext = createContext<TDispatch | undefined | null>(
  undefined
); // for setting state

type Props = {
  children: React.ReactNode;
};

export default function AppLocalDataArea(props: Props) {
  const [data, setData] = React.useState(defaultData);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = React.useState<string>('');
  const theme = useCustomTheme();

  const dispatch = {
    setIsVisitedSplashScreen: (isVisitedSplashScreen: boolean) => {
      setData({...data, isVisitedSplashScreen});
    },

    setIsLoading: (loading: boolean, message?: string) => {
      setIsLoading(loading);
      if (loading === false) {
        setLoadingMessage('');
      }
      if (message) {
        setLoadingMessage(message);
      }
    },
    setCurrentSignature: (signature: string | null) => {
      setData({...data, currentSignature: signature});
    },
  };

  return (
    <DataContext.Provider value={{...data, loading: isLoading}}>
      <DataDispatchContext.Provider value={dispatch}>
        {props.children}

        <ModalContainer
          disableOutsideClick
          modalVisible={isLoading}
          setModalVisible={setIsLoading}>
          <ActivityIndicator color={theme.PRIMARY} size="large" />
          {loadingMessage && (
            <Typography color={theme.PRIMARY}>{loadingMessage}</Typography>
          )}
        </ModalContainer>
      </DataDispatchContext.Provider>
    </DataContext.Provider>
  );
}
