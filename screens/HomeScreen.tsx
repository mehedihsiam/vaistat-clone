import React from 'react';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import HomeScreenArea from '../contexts/HomeScreenContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../types/stacksParamsList';
import {StyleSheet, View} from 'react-native';
import HomeHeader from '../components/HomeScreen/HomeHeader';
import useAuth from '../contexts/hooks/useAuth';
import AmountCapsule from '../components/HomeScreen/AmountCapsule';
import MapViewArea from '../components/HomeScreen/MapViewArea';
import {useHomeNavigatorContextDispatch} from '../contexts/hooks/useHomeNavigatorContext';
import {LOGGED_IN_ROUTES} from '../constants/ROUTES';
import {useFocusEffect} from '@react-navigation/native';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export default function HomeScreen(props: Props) {
  const auth = useAuth();
  const dispatchHomeContext = useHomeNavigatorContextDispatch();

  useFocusEffect(() => {
    dispatchHomeContext?.setActiveRoute(LOGGED_IN_ROUTES.HOME);
  });
  return (
    <NonScrollableScreenContainer paddingVertical={1} paddingHorizontal={1}>
      <HomeScreenArea>
        <HomeHeader
          customTitle={
            <AmountCapsule amount={auth?.today_earning.toFixed(2) || '0.00'} />
          }
          variant="Home"
        />
        <View style={styles.container}>
          <MapViewArea destination={props.route.params?.destination} />
        </View>
      </HomeScreenArea>
    </NonScrollableScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
