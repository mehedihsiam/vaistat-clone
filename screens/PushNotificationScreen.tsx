import React from 'react';
import CustomSwitch from '../components/common/CustomSwitch';
import CommonScreenContainer from '../containers/CommonScreenContainer';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';

export default function PushNotificationScreen() {
  return (
    <CommonScreenContainer
      screenTitleProps={{
        title: 'Push Notifications',
        showBackButton: true,
        paddingHorizontal: COMMONLY_USED_DATA.SCREEN_PADDING,
      }}>
      <CustomSwitch
        onValueChange={() => {}}
        key={1}
        value={true}
        label="Item status"
        description="A product you liked is becoming reality!"
      />
      <CustomSwitch
        onValueChange={() => {}}
        key={2}
        value={false}
        label="Updates"
        description="An update was shared on an item you like"
      />
    </CommonScreenContainer>
  );
}
