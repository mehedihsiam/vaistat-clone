import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import SVGs from '../../assets';
import useCustomTheme from '../../hooks/useCustomTheme';
import Typography from '../common/Typography';
import useUpcomingJobContext from '../../contexts/hooks/useAcceptedJobContext';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import {
  useHomeNavigatorContext,
  useHomeNavigatorContextDispatch,
} from '../../contexts/hooks/useHomeNavigatorContext';
import {HomeStackParamList} from '../../types/stacksParamsList';
import {LOGGED_IN_ROUTES} from '../../constants/ROUTES';
import useUrgentJobContext from '../../contexts/hooks/useUrgentJobContext';

type TRouteName = keyof HomeStackParamList;

type THomeTopButtonGroup = {
  backgroundColor?: string;
  variant?: 'vertical' | 'horizontal';
};

export default function HomeTopButtonGroup(props: THomeTopButtonGroup) {
  const theme = useCustomTheme();
  const {navigate} = useCustomNavigate();
  const dispatchHomeContext = useHomeNavigatorContextDispatch();
  const homeContext = useHomeNavigatorContext();
  const urgentJobsContext = useUrgentJobContext();

  const upcomingJobContext = useUpcomingJobContext();

  const handleNavigate = (routeName: TRouteName) => () => {
    dispatchHomeContext?.setActiveRoute(routeName);
    navigate(routeName);
  };

  const getColor = (
    activeRoute: TRouteName | undefined,
    currentRoute: TRouteName | undefined
  ) => {
    return activeRoute === currentRoute
      ? theme.OPPOSITE_OF_ACCENT
      : currentRoute === LOGGED_IN_ROUTES.URGENT_JOBS
      ? theme.DANGER
      : theme.PRIMARY;
  };

  const getCount = (componentName: string) => {
    switch (componentName) {
      case LOGGED_IN_ROUTES.UPCOMING_JOBS:
        return upcomingJobContext?.upcomingCount || 0;
      case LOGGED_IN_ROUTES.URGENT_JOBS:
        return urgentJobsContext?.count || 0;
      default:
        return 0;
    }
  };

  const Buttons = [
    {
      routeName: LOGGED_IN_ROUTES.UPCOMING_JOBS,
      icon: SVGs.ListBullet(
        20,
        20,
        getColor(homeContext?.activeRoute, LOGGED_IN_ROUTES.UPCOMING_JOBS)
      ),
      count: getCount(LOGGED_IN_ROUTES.UPCOMING_JOBS),
    },
    {
      routeName: LOGGED_IN_ROUTES.URGENT_JOBS,
      icon: SVGs.Siren(
        20,
        20,
        getColor(homeContext?.activeRoute, LOGGED_IN_ROUTES.URGENT_JOBS)
      ),
      count: getCount(LOGGED_IN_ROUTES.URGENT_JOBS),
    },
  ];

  const alignment =
    props.variant === 'vertical' ? styles.vertical : styles.horizontal;

  return (
    <View style={[styles.buttons, alignment]}>
      {Buttons.map(button => {
        const backgroundColor =
          button.routeName === homeContext?.activeRoute
            ? theme.PRIMARY
            : props.backgroundColor || theme.DISABLED_BG;
        return (
          <TouchableOpacity
            activeOpacity={1}
            key={button.routeName}
            onPress={handleNavigate(button.routeName)}
            style={[styles.button, {backgroundColor}]}>
            {button.count > 0 && (
              <View style={styles.counter}>
                <Typography
                  color={theme.OPPOSITE_OF_ACCENT}
                  fontSize={12}
                  fontWeight="600">
                  {button.count > 9 ? '9+' : button.count}
                </Typography>
              </View>
            )}
            {button.icon}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    width: 'auto',
    height: 'auto',
    borderRadius: 16,
    overflow: 'hidden',
    gap: 10,
    paddingHorizontal: COMMONLY_USED_DATA.SCREEN_PADDING,
  },
  vertical: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  counter: {
    position: 'absolute',
    top: 5,
    right: 2,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'red',
    zIndex: 1,
  },
});
