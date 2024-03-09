import React from 'react';
import {useWindowDimensions} from 'react-native';
import SnackBar from '../components/common/SnackBar';
import {TSnackBarVariant} from './hooks/useSnackBarColorAndIcon';
import {useSharedValue, withTiming} from 'react-native-reanimated';

type TSnackBarLoading = {
  children: React.ReactNode;
};

type TSnackBarLoadingSetContext = {
  showSnackBar: (message: string, variant: TSnackBarVariant) => void;
};

const SnackBarContext = React.createContext({});

export const SnackBarSetContext = React.createContext<
  TSnackBarLoadingSetContext | undefined
>(undefined);

export default function SnackBarArea(props: TSnackBarLoading) {
  let timeout: NodeJS.Timeout;
  const {height} = useWindowDimensions();
  const [snackBarVariant, setSnackBarVariant] =
    React.useState<TSnackBarVariant>('info');
  const [snackBarMessage, setSnackBarMessage] = React.useState<string>('');

  const hiddenPosition = -height;
  const shownPosition = 50;

  const top = useSharedValue(hiddenPosition);

  const hideSnackBar = () => {
    top.value = withTiming(hiddenPosition);
    clearTimeout(timeout);
  };

  const showSnackBar = () => {
    top.value = withTiming(shownPosition);
    timeout = setTimeout(() => {
      hideSnackBar();
    }, 3000);
  };

  const dispatch = {
    showSnackBar: (message: string, variant: TSnackBarVariant) => {
      setSnackBarVariant(variant);
      setSnackBarMessage(message);
      showSnackBar();
    },
  };

  return (
    <SnackBarContext.Provider value={{}}>
      <SnackBarSetContext.Provider value={dispatch}>
        {props.children}
        <SnackBar
          message={snackBarMessage}
          variant={snackBarVariant}
          top={top}
        />
      </SnackBarSetContext.Provider>
    </SnackBarContext.Provider>
  );
}
