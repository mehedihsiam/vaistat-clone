import {View} from 'react-native';
import React from 'react';
import EditPersonalData from '../components/EditProfileScreen/EditPersonalData';
import EditVehicleData from '../components/EditProfileScreen/EditVehicleData';
import EditDocuments from '../components/EditProfileScreen/EditDocuments';
import useLanguage from '../hooks/useLanguage';

type TRenderEditProfileComponents = {
  selectedTab: string;
};

export default function RenderEditProfileComponents(
  props: TRenderEditProfileComponents
) {
  const language = useLanguage();
  switch (props.selectedTab) {
    case language.EDIT_PROFILE_SCREEN.PERSONAL:
      return <EditPersonalData />;
    case language.EDIT_PROFILE_SCREEN.VEHICLE:
      return <EditVehicleData />;
    case language.EDIT_PROFILE_SCREEN.DOCUMENTS:
      return <EditDocuments />;

    default:
      <View />;
  }
}
