import {
  useWindowDimensions,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import useCustomTheme from '../../hooks/useCustomTheme';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import SVGs from '../../assets';
import SingleLine from './SingleLine';
import ScreenSidebarCloseArea from './ScreenSidebarCloseArea';
import SideBarMenu from './SideBarMenu';
import Typography from './Typography';
import useAuth from '../../contexts/hooks/useAuth';
import FlexRowStart from './FlexRowStart';
import LinkText from './LinkText';
import Spacer from './Spacer';
import openLink from '../../utils/openLink';
import useLanguage from '../../hooks/useLanguage';
import CircleImage from './CircleImage';

type TScreenSidebar = {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
};

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

export default function ScreenSidebar(props: TScreenSidebar) {
  const {height, width} = useWindowDimensions();
  const theme = useCustomTheme();
  const hiddenPosition = -(width + 100);
  const left = useSharedValue(hiddenPosition);
  const auth = useAuth();
  const language = useLanguage();

  const toggleSlide = () => {
    if (props.isOpen) {
      left.value = withTiming(0);
    } else {
      left.value = withTiming(hiddenPosition);
    }
  };

  const toggleSideBar = () => {
    props.setIsOpen(!props.isOpen);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: left.value,
    };
  });

  const extraStyles = {
    container: {
      height,
      width,
    },
    menu: {
      backgroundColor: theme.OPPOSITE_OF_ACCENT,
    },
  };

  React.useEffect(() => {
    toggleSlide();
  }, [props.isOpen]);

  return (
    <AnimatedSafeAreaView
      style={[styles.container, extraStyles.container, animatedStyle]}>
      <View style={[styles.menuContainer, extraStyles.menu]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.menuScrollContainer]}>
          <TouchableOpacity
            activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
            onPress={toggleSideBar}
            style={styles.closeButton}>
            <FlexRowStart>
              <CircleImage size={30} uri={auth?.profile_img} />

              <Typography fontWeight="600" fontSize={16}>
                {language.COMMON_TEXTS.HELLO} {auth?.first_name}
              </Typography>
            </FlexRowStart>
            {SVGs.Close(24, 24)}
          </TouchableOpacity>

          <SingleLine />

          <SideBarMenu setIsOpen={props.setIsOpen} />
        </ScrollView>
        <Typography textAlign="center">
          {language.SIDEBAR_TEXTS.NEED_HELP}
        </Typography>
        <LinkText onPress={openLink('mailto:support@vaistat.com')}>
          support@vaistat.com
        </LinkText>
        <Spacer height={20} />
      </View>
      <ScreenSidebarCloseArea toggleSideBar={toggleSideBar} />
    </AnimatedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    backgroundColor: '#00000088',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  closeButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  menuScrollContainer: {
    width: '100%',
    flex: 1,
  },
  menuContainer: {
    paddingHorizontal: COMMONLY_USED_DATA.SCREEN_PADDING,
    width: '85%',
    paddingBottom: 20,
    alignItems: 'center',
  },
  profile: {
    height: 30,
    width: 30,
    borderRadius: 20,
    marginRight: 10,
  },
});
