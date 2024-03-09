import {View, StyleSheet} from 'react-native';
import React from 'react';
import {TUpcomingJob} from '../types/jobs';
import JobDetailsCard from './common/JobDetailsCard';

type TProps = {
  job: TUpcomingJob | undefined;
  onPress?: () => void;
};

const TakeOwnershipJobDetails = (props: TProps) => {
  const job = props?.job;
  return (
    <View style={styles.container}>
      <JobDetailsCard
        contactNumber={`${job?.customer_country_code} ${job?.customer_phone}`}
        location={job?.drop_off_location}
        date={`${job?.jobTimingObj.endTime.hour}:${job?.jobTimingObj.endTime.minute}`}
        onPressLocation={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    minHeight: 220,
  },
});

export default TakeOwnershipJobDetails;
