import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {TActiveJob} from '../../types/activeJobs';
import ActiveJobItemButton from '../ActiveJobItemButton';
import ListEmptyComponent from '../ListEmptyComponent';
import Spacer from '../common/Spacer';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import useCustomTheme from '../../hooks/useCustomTheme';
import FlexRowBetween from '../common/FlexRowBetween';
import SVGs from '../../assets';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import {TSetState} from '../../types/setStateType';
import useLanguage from '../../hooks/useLanguage';
import Typography from '../common/Typography';

type TCompletedJobList = {
  jobList: TActiveJob[];
  setRenderedComponent: TSetState<'Active' | 'Completed'>;
};

const CompletedJobList = (props: TCompletedJobList) => {
  const language = useLanguage();
  const theme = useCustomTheme();
  const dimensions = useWindowDimensions();
  const top = useSharedValue(dimensions.height + 100);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      top: top.value,
    };
  });

  const hideList = () => {
    props.setRenderedComponent('Active');
    top.value = withTiming(dimensions.height + 100);
  };

  useEffect(() => {
    top.value = withTiming(50);
  }, []);
  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <TouchableOpacity
        activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
        onPress={hideList}>
        <FlexRowBetween paddingHorizontal={COMMONLY_USED_DATA.SCREEN_PADDING}>
          <Spacer height={0} width={40} />

          <Typography>{language.ACTIVE_JOBS_SCREEN.CLOSE_THE_LIST}</Typography>

          {SVGs.Down(40, 40, theme.PRIMARY)}
        </FlexRowBetween>
      </TouchableOpacity>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item._id}
        data={props.jobList}
        ListEmptyComponent={
          <ListEmptyComponent
            text={language.ACTIVE_JOBS_SCREEN.NO_COMPLETED_JOBS}
          />
        }
        ListFooterComponent={<Spacer height={70} />}
        renderItem={({item, index}) => (
          <ActiveJobItemButton
            customer_name={`${item.customer_f_name} ${item.customer_l_name}`}
            drop_off_location={item.drop_off_location}
            pick_up_location={item.pick_up_location}
            job_id={item._id}
            onPress={() => {}}
            job_tags={item.job_tags}
            job_amount={item.collected_amount}
            variant="completed"
            itemBgColor={
              index % 2 === 0 ? theme.OPPOSITE_OF_ACCENT : theme.DISABLED_BG
            }
            note={item.note}
          />
        )}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 10,
    position: 'absolute',
    left: 0,
    zIndex: 2,
  },
});

export default CompletedJobList;
