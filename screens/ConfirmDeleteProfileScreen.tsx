import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import CheckBox from '../components/common/CheckBox';
import Typography from '../components/common/Typography';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import ScreenTitle from '../components/common/ScreenTitle';
import Button from '../components/Button';
import useCustomTheme from '../hooks/useCustomTheme';
import useShowAlert from '../hooks/useShowAlert';
import {deleteProfileText} from '../constants/ALERT_OBJECTS';
import useLogout from '../APIs/hooks/useLogout';
import useCustomNavigate from '../hooks/useCustomNavigate';
import {LOGGED_IN_ROUTES} from '../constants/ROUTES';
import useLanguage from '../hooks/useLanguage';

export default function ConfirmDeleteProfileScreen() {
  const language = useLanguage();
  const theme = useCustomTheme();
  const showAlert = useShowAlert();
  const logout = useLogout();
  const {navigate} = useCustomNavigate();

  const [isCheckedRemember, setIsCheckedRemember] = React.useState(false);

  const handleConfirm = async () => {
    Alert.alert(language.DELETE_ACCOUNT_SCREEN.DELETE_MESSAGE);
    await logout();
  };

  const handleConfirmDelete = async () => {
    showAlert({
      title: deleteProfileText.title,
      message: deleteProfileText.message,
      onPressYes: handleConfirm,
      onPressNo() {
        navigate(LOGGED_IN_ROUTES.HOME);
      },
    });
  };

  return (
    <NonScrollableScreenContainer>
      <ScreenTitle
        title={language.DELETE_ACCOUNT_SCREEN.TITLE}
        showBackButton={true}
      />
      <View style={styles.container}>
        <Typography>
          {language.DELETE_ACCOUNT_SCREEN.IT_IS_ADVISABLE}
        </Typography>

        <CheckBox
          isChecked={isCheckedRemember}
          setIsChecked={setIsCheckedRemember}
          label={language.DELETE_ACCOUNT_SCREEN.SEND_MY_DATA}
        />

        <Typography fontWeight="400" opacity={0.5}>
          {language.DELETE_ACCOUNT_SCREEN.YOU_WILL_LOSE}
        </Typography>
      </View>
      <Button
        variant="fillRounded"
        backgroundColor={theme.DANGER}
        textColor={theme.OPPOSITE_OF_ACCENT}
        title={language.DELETE_ACCOUNT_SCREEN.CONFIRM_DELETION}
        onPress={handleConfirmDelete}
      />
    </NonScrollableScreenContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    gap: 20,
  },
});
