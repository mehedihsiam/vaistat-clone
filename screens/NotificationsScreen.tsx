import React from 'react';
import NotificationCard from '../components/NotificationScreen/NotificationCard';
import useNotificationContext from '../contexts/hooks/useNotificationContext';
import ScreenContentLoading from '../components/common/ScreenContentLoading';
import useReadNotification from '../APIs/hooks/useReadNotification';
import useAuth from '../contexts/hooks/useAuth';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import NoTaskField from '../components/NoTaskField';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import ScreenTitle from '../components/common/ScreenTitle';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';
import useCustomTheme from '../hooks/useCustomTheme';
import useLanguage from '../hooks/useLanguage';
import usePreferredLanguage from '../hooks/usePreferredLanguage';

export default function NotificationsScreen() {
  const language = useLanguage();
  const preferredLanguage = usePreferredLanguage();
  const notificationContext = useNotificationContext();
  const readNotification = useReadNotification();
  const auth = useAuth();
  const theme = useCustomTheme();

  const handleRead = (id: string) => async () => {
    if (auth) {
      const res = await readNotification({
        driver_id: auth._id,
        notification_id: id,
      });
      if (res.code === 200) {
        notificationContext?.fetchNotifications();
      }
    }
  };

  return (
    <NonScrollableScreenContainer
      paddingHorizontal={0.001}
      paddingVertical={0.001}>
      <ScreenTitle
        title={language.NOTIFICATION_SCREEN.TITLE}
        showBackButton={true}
        paddingHorizontal={COMMONLY_USED_DATA.SCREEN_PADDING}
      />
      {notificationContext?.notifications?.length === 0 ? (
        notificationContext?.loading ? (
          <ScreenContentLoading />
        ) : (
          <View style={styles.container}>
            <NoTaskField text={language.NOTIFICATION_SCREEN.NO_NOTIFICATIONS} />
          </View>
        )
      ) : (
        <FlatList
          data={notificationContext?.notifications}
          renderItem={({item}) => (
            <NotificationCard
              onPress={handleRead(item._id)}
              title={
                preferredLanguage === 'en' ? item.message : item.french_message
              }
              date={new Date(item.createdAt).toDateString()}
              isRead={item.status}
            />
          )}
          keyExtractor={item => item._id}
          refreshControl={
            <RefreshControl
              refreshing={notificationContext?.loading || false}
              onRefresh={notificationContext?.fetchNotifications}
              colors={[theme.PRIMARY]}
            />
          }
        />
      )}
    </NonScrollableScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
