import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import radiusHalfCalculation from '../../utils/radiusHalfCalculation';

import SVGs from '../../assets';
import FilePickingModal from './FilePickingModal';
import {Asset} from 'react-native-image-picker';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';

type TProfilePhoto = {
  image: ImageSourcePropType;
  handleGetImage?: (asset: Asset | undefined) => void;
};

export default function ProfilePhoto(props: TProfilePhoto) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const size = {
    height: radiusHalfCalculation(80).size,
    width: radiusHalfCalculation(80).size,
    borderRadius: radiusHalfCalculation(80).radius,
  };

  const handleOpenModal = () => {
    if (props.handleGetImage) {
      setModalVisible(true);
    }
  };

  return (
    <>
      {props.handleGetImage && (
        <FilePickingModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          handleGetImage={props.handleGetImage}
        />
      )}
      <TouchableOpacity
        style={[styles.container, size]}
        onPress={handleOpenModal}
        disabled={!props.handleGetImage}
        activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}>
        <Image source={props.image} style={[size, styles.image]} />
        {props.handleGetImage && (
          <View style={[size, styles.iconContainer]}>
            {SVGs.Pencil(24, 24, 'white')}
          </View>
        )}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
});
