import {View, StyleSheet} from 'react-native';
import React from 'react';
import HomeTopButtonGroup from './HomeTopButtonGroup';

export default function MapOverlayThreeButtons() {
  return (
    <View style={styles.buttonsParent}>
      <HomeTopButtonGroup variant="vertical" backgroundColor="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsParent: {
    width: '100%',
    alignItems: 'flex-end',
    position: 'absolute',
    top: 70,
    right: 0,
    zIndex: 3,
  },
});
