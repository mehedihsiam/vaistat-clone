import {View, StyleSheet} from 'react-native';
import React from 'react';

type TMethodDetailsContainer = {
  children: React.ReactNode;
};

export default function MethodDetailsContainer(props: TMethodDetailsContainer) {
  return <View style={styles.container}>{props.children}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomStartRadius: 16,
    borderBottomEndRadius: 16,
    gap: 10,
  },
});
