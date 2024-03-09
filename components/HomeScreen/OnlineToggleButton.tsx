import {TouchableOpacity, StyleSheet, View} from 'react-native';
import React from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';

import SVGs from '../../assets';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import {Svg, Circle} from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import useChangeStatus from '../../APIs/hooks/useChangeStatus';
import useAuth from '../../contexts/hooks/useAuth';
import useAuthDispatch from '../../contexts/hooks/useAuthDispatch';
import useSetToken from '../../contexts/hooks/useSetToken';
import Typography from '../common/Typography';
import useSnackBarSetContext from '../../contexts/hooks/useSnackBarLoadingContext';

const BUTTON_SIZE = 100;
const CIRCLE_RADIUS = BUTTON_SIZE / 2.2;
const CIRCLE_AREA = CIRCLE_RADIUS * 2 * Math.PI;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function OnlineToggleButton() {
  const auth = useAuth();
  const isOnline = auth?.isOnline ? +auth.isOnline > 0 : false;

  const dispatchAuth = useAuthDispatch();
  const dispatchToken = useSetToken();
  const theme = useCustomTheme();
  const changeOnlineStatus = useChangeStatus();
  const snackBarContext = useSnackBarSetContext();

  const circleProgress = useSharedValue(isOnline ? 0 : 1);

  const [isDisabled, setIsDisabled] = React.useState(false);
  const [isShown, setIsShown] = React.useState(false);

  const handelPress = async () => {
    if (auth) {
      setIsDisabled(true);
      const res = await changeOnlineStatus(auth?._id, isOnline ? 0 : 1);

      if (res?.code === 200) {
        dispatchAuth(res.result);
        dispatchToken?.setToken(res.result.token);
        setIsShown(true);

        if (isOnline) {
          circleProgress.value = withTiming(1, {duration: 500});
        } else {
          circleProgress.value = withTiming(0, {duration: 500});
        }
      } else {
        snackBarContext?.showSnackBar(res.message, 'error');
      }
    }
  };

  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: CIRCLE_AREA * circleProgress.value,
    };
  });

  const trackCircle = () => {
    if (isOnline) {
      circleProgress.value = withTiming(1, {duration: 500});
    } else {
      circleProgress.value = withTiming(0, {duration: 500});
    }
  };

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isDisabled) {
      timeout = setTimeout(() => {
        setIsDisabled(false);
        setIsShown(false);
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [isDisabled]);

  React.useEffect(() => {
    trackCircle();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.onlineButtonContainer}>
        <TouchableOpacity
          style={[styles.onlineButton]}
          onPress={handelPress}
          activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
          disabled={isDisabled}>
          <Svg>
            <AnimatedCircle
              cx={BUTTON_SIZE / 2}
              cy={BUTTON_SIZE / 2}
              r={CIRCLE_RADIUS}
              fill="none"
              strokeWidth={3}
              stroke={isOnline ? theme.PRIMARY : theme.ACCENT}
              strokeDasharray={CIRCLE_AREA}
              animatedProps={animatedCircleProps}
            />
          </Svg>
          <View style={styles.logoContainer}>
            {isOnline
              ? SVGs.VaistatLogo3D(70, 70)
              : SVGs.VaistatLogo3DBlack(70, 70)}
          </View>
        </TouchableOpacity>
      </View>
      {isShown ? (
        <Typography
          textAlign="center"
          color={isOnline ? theme.PRIMARY : theme.ACCENT}
          flex={1}
          style={styles.text}
          fontWeight="600">
          {isOnline ? 'You are online now' : 'You are offline now'}
        </Typography>
      ) : !isOnline ? (
        <Typography
          textAlign="center"
          color={isOnline ? theme.PRIMARY : theme.ACCENT}
          flex={1}
          style={styles.text}
          fontWeight="600">
          You are offline now
        </Typography>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 130,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',

    // transform: [{translateX: -300 / 2}],
  },
  onlineButtonContainer: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    alignItems: 'center',
  },

  onlineButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  logoContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  text: {
    backgroundColor: 'white',
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    paddingVertical: 1,
  },
});
