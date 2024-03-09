import {
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';
import Typography from '../common/Typography';
import Spacer from '../common/Spacer';
import SVGs from '../../assets';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';

type TImageOutput = {
  source: ImageSourcePropType;
  caption?: string;
  widthRatio?: number;
  onDelete?: () => void;
};

const height = 150;

const ImageOutput = (props: TImageOutput) => {
  const theme = useCustomTheme();

  const imageWidth = height / (props.widthRatio || 1);

  return (
    <View style={[styles.container, {borderColor: theme.PRIMARY}]}>
      <View
        style={[
          styles.imageContainer,
          {width: imageWidth, borderColor: theme.PRIMARY},
        ]}>
        {props.onDelete && (
          <TouchableOpacity
            onPress={props.onDelete}
            activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
            style={[styles.button, {backgroundColor: theme.DANGER}]}>
            {SVGs.Trash(15, 15, theme.OPPOSITE_OF_ACCENT)}
          </TouchableOpacity>
        )}
        <Image style={styles.image} source={props.source} />
      </View>
      {props.caption && <Typography fontSize={12}>{props.caption}</Typography>}
      <Spacer height={10} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    height,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  button: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageOutput;
