import {SafeAreaView, StyleSheet, StatusBar, View} from 'react-native';
import React from 'react';
import useCustomTheme from '../hooks/useCustomTheme';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';

type TNonScrollableScreenContainer = {
  children: React.ReactNode;
  paddingHorizontal?: number;
  paddingVertical?: number;
};

export default function NonScrollableScreenContainer(
  props: TNonScrollableScreenContainer
) {
  const theme = useCustomTheme();

  const extraStyle = {
    backgroundColor: theme.OPPOSITE_OF_ACCENT,
    paddingHorizontal:
      props.paddingHorizontal || COMMONLY_USED_DATA.SCREEN_PADDING,
    paddingVertical: props.paddingVertical || COMMONLY_USED_DATA.SCREEN_PADDING,
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={[styles.screenContainer, extraStyle]}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={theme.OPPOSITE_OF_ACCENT}
        />
        {props.children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});
