import React from 'react';
import CommonScreenContainer from '../containers/CommonScreenContainer';
import ProfileNameAndPhoto from '../components/ProfileScreen/ProfileNameAndPhoto';
import SingleLine from '../components/common/SingleLine';
import EarningTable from '../components/ProfileScreen/EarningTable';
import Spacer from '../components/common/Spacer';
import EarningActions from '../components/ProfileScreen/EarningActions';
import ProfilePharmacyConnectionBox from '../components/ProfileScreen/ProfilePharmacyConnectionBox';
import OutlineButton from '../components/common/OutlineButton';
import Typography from '../components/common/Typography';
import CustomRightArrow from '../components/ProfileScreen/CustomRightArrow';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';
import useAuth from '../contexts/hooks/useAuth';
import useCustomNavigate from '../hooks/useCustomNavigate';
import {LOGGED_IN_ROUTES} from '../constants/ROUTES';
import ProfileDispatchConnectionBox from '../components/ProfileScreen/ProfileDispatchConnectionBox';
import useCustomTheme from '../hooks/useCustomTheme';
import useLanguage from '../hooks/useLanguage';

export default function ProfileScreen() {
  const language = useLanguage();
  const theme = useCustomTheme();
  const auth = useAuth();
  const {navigate} = useCustomNavigate();

  const handleNavigate = (route: string) => () => {
    navigate(route);
  };

  return (
    <CommonScreenContainer
      screenTitleProps={{
        title: language.PROFILE_SCREEN.TITLE,
        showBackButton: true,
        paddingHorizontal: COMMONLY_USED_DATA.SCREEN_PADDING,
      }}>
      <ProfileNameAndPhoto />
      <Spacer height={20} />
      <SingleLine />
      <Spacer height={20} />
      <EarningTable
        title={language.PROFILE_SCREEN.TOTAL}
        jobs={auth?.total_jobs || 0}
        earning={auth?.earning || 0}
        tips={0}
      />
      <Spacer height={20} />
      <EarningTable
        title={language.PROFILE_SCREEN.TODAY}
        jobs={auth?.today_jobs || 0}
        earning={auth?.today_earning || 0}
        tips={auth?.today_tip_amount || 0}
      />
      <Spacer height={20} />
      <EarningActions />
      <Spacer height={20} />
      <SingleLine />
      <Spacer height={20} />
      <ProfilePharmacyConnectionBox />
      <Spacer height={20} />
      <ProfileDispatchConnectionBox />
      <Spacer height={20} />
      <SingleLine />
      {/* <Spacer height={20} />
      <ProfileConnectionBox variant="dispatch" /> */}
      <Spacer height={20} />

      <Spacer height={20} />
      <OutlineButton onPress={handleNavigate(LOGGED_IN_ROUTES.PROFILE_REPORTS)}>
        <Typography fontWeight="500">
          {language.PROFILE_SCREEN.VIEW_REPORTS}
        </Typography>
        <CustomRightArrow />
      </OutlineButton>
      <Spacer height={20} />
      <SingleLine />
      <Spacer height={20} />
      <OutlineButton onPress={handleNavigate(LOGGED_IN_ROUTES.CHANGE_PASSWORD)}>
        <Typography fontWeight="500">
          {language.PROFILE_SCREEN.CHANGE_PASSWORD}
        </Typography>
      </OutlineButton>
      <Spacer height={20} />
      <OutlineButton
        borderColor={theme.DANGER}
        onPress={handleNavigate(LOGGED_IN_ROUTES.DELETE_ACCOUNT)}>
        <Typography fontWeight="500" color={theme.DANGER}>
          {language.PROFILE_SCREEN.DELETE_ACCOUNT_REQUEST}
        </Typography>
      </OutlineButton>
      <Spacer height={20} />
    </CommonScreenContainer>
  );
}
