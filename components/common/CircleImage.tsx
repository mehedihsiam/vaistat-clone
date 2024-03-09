import {Image, ImageSourcePropType, StyleSheet} from 'react-native';
import React from 'react';
import User from '../../assets/placeholders/user-placeholder.png';

type TCircleImage = {
  size?: number;
  uri?: string;
  placeholder?: ImageSourcePropType;
};

const CircleImage = (props: TCircleImage) => {
  const extraStyle = {
    height: props.size || 30,
    width: props.size || 30,
  };
  return (
    <Image
      style={[styles.profile, extraStyle]}
      source={props.uri ? {uri: props.uri} : props.placeholder || User}
    />
  );
};

const styles = StyleSheet.create({
  profile: {
    borderRadius: 20,
    marginRight: 10,
  },
});

export default CircleImage;
