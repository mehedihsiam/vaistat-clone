import React from 'react';
import {View} from 'react-native';

import CustomSwitch from '../components/common/CustomSwitch';
import Divider from '../components/common/Devider';
import Spacer from '../components/common/Spacer';
import Typography from '../components/common/Typography';
import CommonScreenContainer from '../containers/CommonScreenContainer';
import {notificationMenuData} from '../data/NotificationMenuData';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';
import MenuItem from '../components/common/MenuItem';

export default function NotificationSettingsScreen() {
  return (
    <CommonScreenContainer
      screenTitleProps={{
        title: 'Notifications',
        showBackButton: true,
        paddingHorizontal: COMMONLY_USED_DATA.SCREEN_PADDING,
      }}>
      <CustomSwitch
        onValueChange={() => {}}
        key={1}
        value={false}
        label="Pause all"
      />
      <Spacer height={10} />
      <Typography fontSize={12}>Temporarily pause notifications</Typography>
      <Spacer height={16} />
      <Divider />
      <Spacer height={16} />
      <View>
        {notificationMenuData.map(item => (
          <MenuItem key={item.id} menuItem={item} />
        ))}
      </View>
    </CommonScreenContainer>
  );
}
