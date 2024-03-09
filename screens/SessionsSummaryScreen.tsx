import React from 'react';
import ActiveDeviceDetails from '../components/SessionsScreen/ActiveDeviceDetails';
import SessionItem from '../components/SessionsScreen/SessionItem';
import CommonScreenContainer from '../containers/CommonScreenContainer';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';

export default function SessionsSummaryScreen() {
  return (
    <CommonScreenContainer
      screenTitleProps={{
        title: 'Session Summary',
        showBackButton: true,
        paddingHorizontal: COMMONLY_USED_DATA.SCREEN_PADDING,
      }}>
      <ActiveDeviceDetails deviceName="iPhone 14" IMEINumber="XXXXXXXXXXXXX" />
      <SessionItem
        loginData="Montreal, CA 30 Jun, 2023 at 16:35"
        logOutData="Montreal, CA 30 Jun, 2023 at 16:35"
      />
      <SessionItem
        loginData="Montreal, CA 30 Jun, 2023 at 16:35"
        logOutData="Montreal, CA 30 Jun, 2023 at 16:35"
      />
    </CommonScreenContainer>
  );
}
