import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import useLogout from '../APIs/hooks/useLogout';
import SVGs from '../assets';
import Button from '../components/Button';
import FooterContent from '../components/SettingScreen/FooterContent';
import SettingsMenu from '../components/SettingScreen/SettingsMenu';
import Divider from '../components/common/Devider';
import ScreenTitle from '../components/common/ScreenTitle';
import Spacer from '../components/common/Spacer';
import useDispatchAppLocalData from '../contexts/hooks/useDispatchAppLocalData';
import useCustomTheme from '../hooks/useCustomTheme';

export default function SettingScreen() {
  const theme = useCustomTheme();
  const logout = useLogout();
  const dispatchAppData = useDispatchAppLocalData();

  const handelLogout = async () => {
    dispatchAppData?.setIsLoading(true);
    const res = await logout();
    if (res) {
      dispatchAppData?.setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: theme.OPPOSITE_OF_ACCENT}]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.OPPOSITE_OF_ACCENT}
      />
      <View style={styles.container}>
        <ScreenTitle showBackButton title="Settings" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}>
          <SettingsMenu />
          <Spacer height={10} />
          <Divider />
          <Spacer height={10} />
          <Button
            variant="withTextAndIcon"
            title="Log Out"
            textColor={theme.DANGER}
            icon={SVGs.Logout(19, 19, theme.DANGER)}
            onPress={handelLogout}
          />

          <Spacer height={30} />
        </ScrollView>
        <View style={styles.footer}>
          <FooterContent />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    position: 'relative',
    paddingBottom: 80,
  },
  scrollContainer: {
    flex: 1,
  },
  logoutBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
  },
});
