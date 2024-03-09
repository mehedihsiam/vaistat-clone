import {View, StyleSheet, ImageSourcePropType, Image} from 'react-native';
import React from 'react';
import Typography from './Typography';

type TTag = {
  tag: string;
  backgroundColor: string;
  color?: string;
  flex?: number;
  tagImage?: ImageSourcePropType;
};

export default function Tag(props: TTag) {
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: props.backgroundColor, flex: props.flex || 0},
      ]}>
      {props.tagImage && (
        <Image source={props.tagImage} style={styles.tagImage} />
      )}
      <Typography fontSize={12} fontWeight="500" color={props.color || 'white'}>
        {props.tag}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    width: 'auto',

    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    gap: 4,
  },
  tagImage: {
    height: 20,
    width: 20,
  },
});
