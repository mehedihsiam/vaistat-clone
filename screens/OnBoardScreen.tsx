import React, {useRef} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {
  TOnboardingData,
  useOnboardingData,
} from '../components/OnBoardItem/OnboardingData';
import Pagination from '../components/onboarding/Pagination';
import RenderItem from '../components/onboarding/RenderItem';
import useCustomTheme from '../hooks/useCustomTheme';
import Button from '../components/Button';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedOutStackParamList} from '../types/stacksParamsList';
import useSetToken from '../contexts/hooks/useSetToken';
import useAuthDispatch from '../contexts/hooks/useAuthDispatch';
import useSignupFormDataContext from '../contexts/hooks/useSignupFormDataContext';
import storage from '../utils/storage';
import JSON_KEYS from '../constants/JSON_KEYS';
import useLanguage from '../hooks/useLanguage';

type Props = NativeStackScreenProps<LoggedOutStackParamList, 'OnBoarding'>;

const OnboardingScreen = (props: Props) => {
  const language = useLanguage();
  const params = props.route.params;
  const auth = params?.auth;

  const onboardingData = useOnboardingData();
  const theme = useCustomTheme();
  const tokenContext = useSetToken();
  const dispatchAuth = useAuthDispatch();
  const flatListRef = useAnimatedRef<FlatList<TOnboardingData>>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const signUpFormData = useSignupFormDataContext();

  let ended: boolean = false;

  const handleEndReached = () => {
    ended = true;
  };

  const closeOnboarding = async () => {
    const localCredentials = {
      email: signUpFormData?.localData?.email,
      password: signUpFormData?.localData?.password,
    };
    if (auth) {
      await storage.set(
        JSON_KEYS.AUTH_CREDENTIALS,
        JSON.stringify(localCredentials)
      );
      dispatchAuth(auth);
      tokenContext?.setToken(auth?.token);
    }
  };

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };

  const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });
  const handlePressNext = () => {
    if (flatListIndex.value < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({index: flatListIndex.value + 1});
    }
    if (ended) {
      closeOnboarding();
    }
  };

  return (
    <NonScrollableScreenContainer>
      <View style={styles.skipButton}>
        {flatListIndex.value < onboardingData.length - 2 && (
          <TouchableOpacity
            onPress={closeOnboarding}
            activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}>
            <Text style={{color: theme.ACCENT}}>
              {language.COMMON_TEXTS.SKIP}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={onScroll}
        data={onboardingData}
        renderItem={({item}) => <RenderItem item={item} />}
        keyExtractor={item => `${item.id}`}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        onEndReached={handleEndReached}
      />

      <Pagination data={onboardingData} x={x} />

      <Button
        onPress={handlePressNext}
        title={language.COMMON_TEXTS.NEXT}
        variant="fillRounded"
        backgroundColor={theme.PRIMARY}
        textColor={theme.OPPOSITE_OF_ACCENT}
      />
    </NonScrollableScreenContainer>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  skipButton: {alignItems: 'flex-end', padding: 20},
});
