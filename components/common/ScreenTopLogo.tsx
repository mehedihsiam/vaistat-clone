import {View, StyleSheet} from 'react-native';
import React from 'react';
import SVGs from '../../assets';

type TScreenTopLogo = {
  paddingVertical?: number;
};

export default function ScreenTopLogo(props: TScreenTopLogo) {
  return (
    <View
      style={[
        styles.container,
        {paddingVertical: props.paddingVertical || 80},
      ]}>
      {SVGs.VaistatLogo(175, 350)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',

    alignItems: 'center',
  },
});
