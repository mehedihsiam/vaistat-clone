import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {View, StyleSheet} from 'react-native';
import React from 'react';
import {TSetState} from '../../types/setStateType';
import Typography from '../common/Typography';
import Button from '../Button';
import Spacer from '../common/Spacer';
import ModalContainer from '../../containers/ModalContainer';
import {request, PERMISSIONS} from 'react-native-permissions';

type FilePickingModal = {
  modalVisible: boolean;
  setModalVisible: TSetState<boolean>;
  handleGetImage: (asset: Asset | undefined) => void;
};

export default function FilePickingModal(props: FilePickingModal) {
  const {modalVisible, setModalVisible, handleGetImage} = props;

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const requestPermission = async () => {
    request(PERMISSIONS.ANDROID.CAMERA);
    request(PERMISSIONS.IOS.CAMERA);
  };

  const handlePicImage = async () => {
    try {
      await launchImageLibrary({mediaType: 'photo', selectionLimit: 1}, res => {
        const asset = res?.assets?.[0];
        if (asset) {
          handleGetImage(asset);
          handleModalClose();
        }
      });
    } catch (error) {
      handleModalClose();
    }
  };

  const handleCaptureImage = async () => {
    try {
      await launchCamera({mediaType: 'photo'}, res => {
        const asset = res?.assets?.[0];
        handleGetImage(asset);
        handleModalClose();
      });
    } catch (error) {
      handleModalClose();
    }
  };

  React.useEffect(() => {
    requestPermission();
  }, []);

  return (
    <ModalContainer
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}>
      <View style={styles.modalView}>
        <Typography fontWeight="600">Select Image</Typography>
        <Spacer height={2} />
        <Button
          onPress={handleCaptureImage}
          variant="transparent"
          title="Take a Photo"
        />
        <Button
          onPress={handlePicImage}
          variant="transparent"
          title="Select From Gallery"
        />
      </View>
    </ModalContainer>
  );
}

const styles = StyleSheet.create({
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    padding: 16,
    gap: 15,
    borderRadius: 16,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
