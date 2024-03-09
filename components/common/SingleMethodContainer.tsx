import {View, StyleSheet} from 'react-native';
import React from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';

type TSingleMethodContainer = {
  children: React.ReactNode;
};

export default function SingleMethodContainer(props: TSingleMethodContainer) {
  const theme = useCustomTheme();
  return (
    <View style={[styles.container, {borderColor: theme.DISABLED_TEXT}]}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
  },
});
