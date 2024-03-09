import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React from 'react';
import useCustomTheme from '../hooks/useCustomTheme';
import ScreenTitle, {TScreenTitle} from '../components/common/ScreenTitle';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';

type TCommonScreenContainer = {
  children: React.ReactNode;
  statusBarBg?: string;
  paddingHorizontal?: number;
  screenTitleProps?: TScreenTitle;
  refreshing?: boolean;
  onRefresh?: () => void;
};

export default function CommonScreenContainer(props: TCommonScreenContainer) {
  const theme = useCustomTheme();
  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: theme.OPPOSITE_OF_ACCENT}]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={props.statusBarBg || theme.OPPOSITE_OF_ACCENT}
      />
      {props.screenTitleProps && <ScreenTitle {...props.screenTitleProps} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          props.refreshing !== undefined ? (
            <RefreshControl
              refreshing={props.refreshing}
              onRefresh={props.onRefresh}
              colors={[theme.PRIMARY, theme.SECONDARY]}
            />
          ) : undefined
        }
        style={[
          styles.scrollView,
          {
            paddingHorizontal:
              props.paddingHorizontal === undefined
                ? COMMONLY_USED_DATA.SCREEN_PADDING
                : props.paddingHorizontal,
          },
        ]}
        keyboardShouldPersistTaps="handled">
        {props.children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});
