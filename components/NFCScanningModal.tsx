import React from 'react';
import ModalContainer from '../containers/ModalContainer';
import {TSetState} from '../types/setStateType';
import ScanningWithLogo from './ScanningWithLogo';
import PaymentReceivedWithAmount from './PaymentReceivedWithAmount';

type NFCScanningModalProps = {
  modalVisible: boolean;
  setModalVisible: TSetState<boolean>;
  isSucceeded?: boolean;
};

export default function NFCScanningModal(props: NFCScanningModalProps) {
  return (
    <ModalContainer
      modalVisible={props.modalVisible}
      setModalVisible={props.setModalVisible}
      disableOutsideClick>
      {props.isSucceeded ? (
        <PaymentReceivedWithAmount amount={10} />
      ) : (
        <ScanningWithLogo />
      )}
    </ModalContainer>
  );
}
