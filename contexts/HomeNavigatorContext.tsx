import React, {createContext} from 'react';
import ScreenSidebar from '../components/common/ScreenSidebar';
import MainAppFooter from '../components/common/MainAppFooter';
import {HomeStackParamList} from '../types/stacksParamsList';
import {LOGGED_IN_ROUTES} from '../constants/ROUTES';

type TActiveRoute = keyof HomeStackParamList;

type TDispatch = {
  setOpenSidebar: (arg: boolean) => void;
  setActiveRoute: (arg: TActiveRoute) => void;
};

type THomeNavigatorContext = {
  openSidebar: boolean;
  activeRoute: TActiveRoute;
};

export const HomeNavigatorContext = createContext<
  THomeNavigatorContext | undefined
>(undefined);
export const HomeNavigatorDispatchContext = createContext<
  TDispatch | undefined
>(undefined); // for setting state

type Props = {
  children: React.ReactNode;
};

export default function HomeNavigatorArea(props: Props) {
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const [activeRoute, setActiveRoute] = React.useState<TActiveRoute>(
    LOGGED_IN_ROUTES.HOME
  );

  const dispatch = {
    setOpenSidebar: (arg: boolean) => {
      setOpenSidebar(arg);
    },
    setActiveRoute: (arg: TActiveRoute) => {
      setActiveRoute(arg);
    },
  };

  const values = {
    openSidebar,
    activeRoute,
  };

  return (
    <HomeNavigatorContext.Provider value={values}>
      <HomeNavigatorDispatchContext.Provider value={dispatch}>
        <ScreenSidebar setIsOpen={setOpenSidebar} isOpen={openSidebar} />
        {props.children}
        <MainAppFooter
          activeRoute={activeRoute}
          setActiveRoute={setActiveRoute}
        />
      </HomeNavigatorDispatchContext.Provider>
    </HomeNavigatorContext.Provider>
  );
}
