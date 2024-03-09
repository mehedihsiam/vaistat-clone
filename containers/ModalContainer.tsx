import {View, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {TSetState} from '../types/setStateType';
import useCustomTheme from '../hooks/useCustomTheme';

export type TModalContainerProps = {
  modalVisible: boolean;
  setModalVisible?: TSetState<boolean>;
  children: React.ReactNode;
  disableOutsideClick?: boolean;
};

export default function ModalContainer(props: TModalContainerProps) {
  const {modalVisible, setModalVisible} = props;
  const theme = useCustomTheme();

  const handleModalClose = () => {
    if (!props.disableOutsideClick) {
      setModalVisible?.(false);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      statusBarTranslucent={true}
      onRequestClose={handleModalClose}
      onDismiss={handleModalClose}>
      <View
        style={[styles.centeredView, {backgroundColor: theme.DISABLED_TEXT}]}>
        <TouchableOpacity
          style={styles.closingArea}
          onPress={handleModalClose}
          activeOpacity={1}
        />
        <View style={styles.contentContainer}>{props.children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    position: 'relative',
  },
  closingArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
  },
  contentContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
