import React from 'react';
import ScreenFooter from './ScreenFooter';
import {LOGGED_IN_ROUTES} from '../../constants/ROUTES';
import SVGs from '../../assets';
import {HomeStackParamList} from '../../types/stacksParamsList';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import useCustomTheme from '../../hooks/useCustomTheme';
import IconButtonWithCounter from '../HomeScreen/IconButtonWithCounter';
import useUpcomingJobContext from '../../contexts/hooks/useAcceptedJobContext';
import useActiveJobContext from '../../contexts/hooks/useActiveJobContext';

type TRoute = keyof HomeStackParamList;

type TMainAppFooter = {
  activeRoute: TRoute;
  setActiveRoute: (arg: TRoute) => void;
};

export default function MainAppFooter(props: TMainAppFooter) {
  const theme = useCustomTheme();
  const {navigate} = useCustomNavigate();
  const acceptedJobList = useUpcomingJobContext();
  const activeJobList = useActiveJobContext();

  const handleNavigate = (route: keyof HomeStackParamList) => () => {
    props.setActiveRoute(route);
    navigate(route);
  };

  const tabList = [
    {
      label: 'Home',
      route: LOGGED_IN_ROUTES.HOME,
      icon: SVGs.House(30, 30),
      iconActive: SVGs.HouseFill(30, 30),
    },
    {
      label: 'Accepted Jobs',
      route: LOGGED_IN_ROUTES.ACCEPTED_JOBS,
      icon: SVGs.Package(30, 30),
      iconActive: SVGs.PackageFill(30, 30),
      count: acceptedJobList?.acceptedCount || 0,
    },
    {
      label: 'Active Jobs',
      route: LOGGED_IN_ROUTES.ACTIVE_JOBS,
      icon: SVGs.CarSimple(30, 30),
      iconActive: SVGs.CarSimpleFill(30, 30, theme.PRIMARY),
      count: activeJobList?.count || 0,
    },
    {
      label: 'Task Jobs',
      route: LOGGED_IN_ROUTES.TASK_JOBS,
      icon: SVGs.UserList(30, 30),
      iconActive: SVGs.UserListFill(30, 30),
      count: acceptedJobList?.taskCount || 0,
    },
  ];

  return (
    <ScreenFooter border backgroundColor={theme.OPPOSITE_OF_ACCENT}>
      {tabList.map(tab => (
        <IconButtonWithCounter
          count={tab.count || 0}
          icon={props.activeRoute === tab.route ? tab.iconActive : tab.icon}
          onPress={handleNavigate(tab.route)}
          key={tab.route}
        />
      ))}
    </ScreenFooter>
  );
}
