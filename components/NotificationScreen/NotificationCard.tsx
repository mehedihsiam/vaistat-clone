import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import SVGs from '../../assets';
import useCustomTheme from '../../hooks/useCustomTheme';
import FlexRowStart from '../common/FlexRowStart';
import Typography from '../common/Typography';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';

type TNotificationCard = {
  title: string;
  date: string;
  onPress?: () => void;
  isRead?: boolean;
};

const NotificationCard = (props: TNotificationCard) => {
  const theme = useCustomTheme();
  const backgroundColor = theme.DISABLED_BG;
  const opacity = props.isRead ? 0.5 : 1;
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
      disabled={props.isRead}
      style={[styles.container, {backgroundColor, opacity}]}>
      <FlexRowStart gap={10} paddingVertical={20}>
        {SVGs.Notification(24, 24, theme.PRIMARY)}
        <View style={styles.contentContainer}>
          <Typography flex={1} color={theme.ACCENT}>
            {props.title}
          </Typography>
          <FlexRowStart gap={5}>
            {SVGs.Clock(12, 12)}
            <Typography fontSize={14} color={theme.DISABLED_TEXT}>
              {props.date}
            </Typography>
          </FlexRowStart>
        </View>
      </FlexRowStart>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  contentContainer: {
    width: '100%',
    flex: 1,
  },
});

export default NotificationCard;
