import {Asset} from 'react-native-image-picker';
import React from 'react';
import {TSetState} from '../../types/setStateType';

import {TAccountVerificationDoc} from '../../types/accountVerification';
import FilePickingModal from '../common/FilePickingModal';

type TDocUploadModal = {
  modalVisible: boolean;
  setModalVisible: TSetState<boolean>;
  docObject: TAccountVerificationDoc;
  setCount: TSetState<number>;
};

export default function DocUploadModal(props: TDocUploadModal) {
  const {modalVisible, setModalVisible, setCount} = props;

  const handleGetImage = (asset: Asset | undefined) => {
    props.docObject.image = asset;
    setCount(prev => prev + 1);
  };

  return (
    <>
      <FilePickingModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleGetImage={handleGetImage}
      />
    </>
  );
}
