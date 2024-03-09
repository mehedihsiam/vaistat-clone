import {View, StyleSheet} from 'react-native';
import React from 'react';

type TScreenFooter = {
  height?: number;
  children: React.ReactNode;
  backgroundColor?: string;
  border?: boolean;
};

export default function ScreenFooter(props: TScreenFooter) {
  const borderStyle = props.border
    ? {borderTopWidth: 1, borderTopColor: '#E5E5E5'}
    : {};
  return (
    <View
      style={[
        styles.container,
        borderStyle,
        {height: props.height || 60, backgroundColor: props.backgroundColor},
      ]}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
