import React from 'react';
import {StyleSheet, View} from 'react-native';
import COMMONLY_USED_DATA from '../../../constants/COMMONLY_USED_DATA';

import JobInformation from './JobInformation';
import PharmacyInformation from './PharmacyInformation';
import {TSingleJobPharmacy} from '../../../types/jobs';
import {TOnAccept, TOnAcceptAll} from '../../../types/jobAccept';

export type TJobButton = 'Accept' | 'Take Ownership';
type TJobComponent = {
  buttonType?: TJobButton;
  data: TSingleJobPharmacy;
  onAcceptAll: TOnAcceptAll;
  onAccept: TOnAccept;
};

export default function JobComponent(props: TJobComponent) {
  const [isOpen, setIsOpen] = React.useState(false);
  const business = props?.data?.business;
  const jobs = props?.data?.jobs;

  return (
    <View style={styles.parent}>
      <PharmacyInformation
        pharmacyLocation={business.location}
        deliveryCount={jobs.length}
        pickupCount={business.pickUpAmount}
        pharmacyName={props.data?.business.name}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        logo={{uri: business.logo}}
        buttonType={props.buttonType}
        onAcceptAll={props.onAcceptAll}
        pharmacy_id={props.data?.business.id}
      />
      {isOpen &&
        jobs.map(job => (
          <JobInformation
            onAccept={props.onAccept}
            buttonType={props.buttonType}
            pharmacy_id={props.data.business.id}
            key={job._id}
            job_id={job._id}
            {...job}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    width: '100%',
  },
  parentShownContainer: {
    width: '100%',
    paddingHorizontal: COMMONLY_USED_DATA.SCREEN_PADDING,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
});
