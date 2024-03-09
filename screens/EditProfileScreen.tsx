import React from 'react';
import EditProfileTabs from '../components/EditProfileScreen/EditProfileTabs';

import RenderEditProfileComponents from '../containers/RenderEditProfileComponents';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import ScreenTitle from '../components/common/ScreenTitle';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';
import useLanguage from '../hooks/useLanguage';

export default function EditProfileScreen() {
  const language = useLanguage();
  const EDIT_PROFILE_TABS = [
    language.EDIT_PROFILE_SCREEN.PERSONAL,
    language.EDIT_PROFILE_SCREEN.VEHICLE,
    language.EDIT_PROFILE_SCREEN.DOCUMENTS,
  ];
  const [selectedTab, setSelectedTab] = React.useState<string>(
    EDIT_PROFILE_TABS[0]
  );
  return (
    <NonScrollableScreenContainer
      paddingVertical={0.1}
      paddingHorizontal={COMMONLY_USED_DATA.SCREEN_PADDING}>
      <ScreenTitle title={language.EDIT_PROFILE_SCREEN.TITLE} showBackButton />
      <EditProfileTabs
        tabs={EDIT_PROFILE_TABS}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <RenderEditProfileComponents selectedTab={selectedTab} />
    </NonScrollableScreenContainer>
  );
}
