import React from 'react';
import CustomSwitch from '../components/common/CustomSwitch';
import CommonScreenContainer from '../containers/CommonScreenContainer';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';

export default function AppNotificationScreen() {
  return (
    <CommonScreenContainer
      screenTitleProps={{
        title: 'In-app Notifications',
        showBackButton: true,
        paddingHorizontal: COMMONLY_USED_DATA.SCREEN_PADDING,
      }}>
      <CustomSwitch
        onValueChange={() => {}}
        key={1}
        value={true}
        label="Upcoming jobs"
      />
      <CustomSwitch
        onValueChange={() => {}}
        key={2}
        value={false}
        label="Payment received"
      />
    </CommonScreenContainer>
  );
}
