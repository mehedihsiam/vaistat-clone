import {View, StyleSheet} from 'react-native';
import React from 'react';
import ProfilePhoto from '../common/ProfilePhoto';
import Typography from '../common/Typography';
import useCustomTheme from '../../hooks/useCustomTheme';
import OutlineButton from '../common/OutlineButton';
import useAuth from '../../contexts/hooks/useAuth';
import Spacer from '../common/Spacer';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import {LOGGED_IN_ROUTES} from '../../constants/ROUTES';
import placeholder from '../../assets/placeholders/user-placeholder.png';
import useLanguage from '../../hooks/useLanguage';

export default function ProfileNameAndPhoto() {
  const language = useLanguage();
  const theme = useCustomTheme();
  const auth = useAuth();
  const {navigate} = useCustomNavigate();

  const handleEditProfile = () => {
    navigate(LOGGED_IN_ROUTES.EDIT_PROFILE);
  };

  return (
    <View style={styles.container}>
      <ProfilePhoto
        image={auth?.profile_img ? {uri: auth?.profile_img} : placeholder}
      />
      <Spacer height={10} />
      <Typography fontWeight="600">{auth?.first_name}</Typography>
      <Typography color={theme.DISABLED_TEXT}>{auth?.username}</Typography>
      <OutlineButton onPress={handleEditProfile} width="100%">
        <Typography color={theme.ACCENT}>
          {language.PROFILE_SCREEN.EDIT}
        </Typography>
      </OutlineButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: 5,
  },
});
