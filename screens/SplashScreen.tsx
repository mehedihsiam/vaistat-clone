import {View, StyleSheet, StatusBar, BackHandler, Image} from 'react-native';
import React, {useEffect} from 'react';
import useCustomTheme from '../hooks/useCustomTheme';
import useCustomNavigate from '../hooks/useCustomNavigate';
import {ROOT_ROUTES} from '../constants/ROUTES';
import useDispatchAppLocalData from '../contexts/hooks/useDispatchAppLocalData';
import {useFocusEffect} from '@react-navigation/native';
import useLocalAppData from '../contexts/hooks/useLocalAppData';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import logo from '../assets/images/logo-circle.png';

export default function SplashScreen() {
  const theme = useCustomTheme();
  const defaultDataDispatch = useDispatchAppLocalData();
  const {isVisitedSplashScreen} = useLocalAppData();
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const {navigate} = useCustomNavigate();

  useFocusEffect(() => {
    if (isVisitedSplashScreen) {
      BackHandler.exitApp();
    }
  });

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;

    const timeout1 = setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + 8)),
      100
    );
    const timeout2 = setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + 8.5)),
      300
    );
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [ring1padding, ring2padding]);

  useEffect(() => {
    const interval = setTimeout(() => {
      defaultDataDispatch?.setIsVisitedSplashScreen(true);
      navigate(ROOT_ROUTES.MAIN_APP);
    }, 2000);

    return () => clearTimeout(interval);
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isVisitedSplashScreen
            ? theme.OPPOSITE_OF_ACCENT
            : theme.PRIMARY,
        },
      ]}>
      <StatusBar
        backgroundColor={
          isVisitedSplashScreen ? theme.OPPOSITE_OF_ACCENT : theme.PRIMARY
        }
      />
      <Animated.View style={[styles.circleTwo, {padding: ring2padding}]}>
        <Animated.View style={[styles.circleOne, {padding: ring1padding}]}>
          <Image source={logo} style={styles.logo} />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleTwo: {
    backgroundColor: '#4ec08d',
    borderRadius: 100,
  },
  circleOne: {
    backgroundColor: '#58b68c',
    borderRadius: 100,
  },
  logo: {width: 100, height: 100},
});
