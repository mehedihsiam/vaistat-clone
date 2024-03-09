import React from 'react';
import {StyleSheet, View} from 'react-native';
import SVGs from '../assets';
import logo from '../assets/images/logo-circle.png';
import Button from '../components/Button';
import DetailsBoxWrapper from '../components/common/DetailsBoxWrapper';
import FlexRowStart from '../components/common/FlexRowStart';
import JobParentTopLine from '../components/common/JobComponent/JobParentTopLine';
import JobDetailsCard from '../components/common/JobDetailsCard';
import ScreenTitle from '../components/common/ScreenTitle';
import Spacer from '../components/common/Spacer';
import Typography from '../components/common/Typography';
import CommonScreenContainer from '../containers/CommonScreenContainer';
import useCustomTheme from '../hooks/useCustomTheme';
import useCustomNavigate from '../hooks/useCustomNavigate';
import {LOGGED_IN_ROUTES} from '../constants/ROUTES';

export default function JobDetailsScreen() {
  const theme = useCustomTheme();
  const {navigate} = useCustomNavigate();

  const handlePressReceivePayment = () => {
    navigate(LOGGED_IN_ROUTES.PAYMENT, {
      collectableAmount: 7,
      jobId: 'test-job-id',
    });
  };

  return (
    <CommonScreenContainer
      screenTitleProps={{
        title: 'Delivery Job',
        showBackButton: true,
      }}>
      <View style={styles.container}>
        <JobParentTopLine
          hideDownArrow
          logo={logo}
          isOpen={true}
          name={'Pharmacie Proxim Chadi Kabak'}
        />
        <Spacer height={20} />
        <JobDetailsCard
          location="Dhaka, Bangladesh"
          contactNumber="+1 514-288-4864"
          date="Wed 19 Jul 2023, before 11:00am"
        />
        <Spacer height={20} />
        <View style={{alignItems: 'center'}}>{SVGs.ScrollArrow(26, 26)}</View>
      </View>
      <Spacer height={20} />
      <JobDetailsCard
        location="Dhaka, Bangladesh"
        contactNumber="+1 514-288-4864"
        date="Wed 19 Jul 2023, before 11:00am"
      />
      <DetailsBoxWrapper>
        <FlexRowStart>
          {SVGs.Chat(16, 16, theme.PRIMARY)}
          <Typography>Ask for payment when items go to delivery</Typography>
        </FlexRowStart>
        <Spacer height={10} />
        <Button
          backgroundColor={theme.PRIMARY}
          variant="fillRounded"
          textColor={theme.OPPOSITE_OF_ACCENT}
          title="Receive $2.00 payment"
          onPress={handlePressReceivePayment}
        />
      </DetailsBoxWrapper>
    </CommonScreenContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
