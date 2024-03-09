import {TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

type TScreenSidebarCloseArea = {
  toggleSideBar: () => void;
};

export default function ScreenSidebarCloseArea(props: TScreenSidebarCloseArea) {
  return (
    <TouchableOpacity
      onPress={props.toggleSideBar}
      style={styles.closeHiddenButton}
    />
  );
}

const styles = StyleSheet.create({
  closeHiddenButton: {
    width: '15%',
  },
});
