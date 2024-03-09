import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TJobButton} from '.';
import COMMONLY_USED_DATA from '../../../constants/COMMONLY_USED_DATA';
import useCustomTheme from '../../../hooks/useCustomTheme';
import JobDate from './JobDate';
import JobLocation from './JobLocation';
import {TOnAccept} from '../../../types/jobAccept';
import useAuth from '../../../contexts/hooks/useAuth';
import {TUpcomingJob} from '../../../types/jobs';
import Tag from '../Tag';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import RightButton from './RightButton';
import useLanguage from '../../../hooks/useLanguage';

export type TJobInformation = TUpcomingJob & {
  onAccept: TOnAccept;
  job_id: string;
  buttonType?: TJobButton;
  pharmacy_id: string;
  tags?: {tag: string; backgroundColor: string}[];
};

export default function JobInformation(props: TJobInformation) {
  const language = useLanguage();
  const theme = useCustomTheme();
  const auth = useAuth();
  const extraStyles = {
    backgroundColor: theme.DISABLED_BG,
  };

  const handlePress = () => {
    if (auth?._id) {
      props.onAccept(auth._id, props.job_id, props.pharmacy_id);
    }
  };

  const getButtonText = () => {
    switch (props.buttonType) {
      case 'Accept':
        return language?.COMMON_TEXTS.ACCEPT;

      case 'Take Ownership':
        return language?.COMMON_TEXTS.TAKE_OWNERSHIP;

      default:
        return language?.COMMON_TEXTS.ACCEPT;
    }
  };

  return (
    <Swipeable
      containerStyle={[styles.container]}
      rightThreshold={10}
      dragOffsetFromRightEdge={10}
      renderLeftActions={() => null}
      renderRightActions={() => (
        <RightButton title={getButtonText()} onPress={handlePress} />
      )}>
      <View style={[styles.childrenContainer, extraStyles]}>
        <View style={styles.topLine}>
          {/* <FlexRowStart gap={5} flexWrap="wrap">
          {props.tags.map(tag => (
            <Tag
              key={`TAG_${props.date}__${tag.tag}`}
              tag={tag.tag}
              backgroundColor={tag.backgroundColor}
            />
          ))}
        </FlexRowStart> */}

          {props.job_amount > 0 && (
            <Tag
              tag={`Collect $${props.job_amount?.toFixed(2)}`}
              backgroundColor={theme.SUCCESS}
            />
          )}
        </View>
        {/* <JobPerson
          person={`${props.customer_f_name} ${props.customer_l_name}`}
        /> */}
        <JobLocation location={props.drop_off_location} />
        <JobDate date={new Date(props.job_date).toDateString()} />
        {/* <OutlineButton onPress={handlePress}>
        <Typography>
          {props?.buttonType ? props?.buttonType : 'Accept'}.&nbsp;
          <Typography color={theme.PRIMARY}>
            {props.estimate_distance} km away
          </Typography>
        </Typography>
      </OutlineButton> */}
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    height: 120,
  },
  childrenContainer: {
    width: '100%',
    height: '100%',
    paddingHorizontal: COMMONLY_USED_DATA.SCREEN_PADDING,
    paddingVertical: 10,
    gap: 10,
  },
  topLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
