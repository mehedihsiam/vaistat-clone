import React, {useRef} from 'react';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import ScreenTitle from '../components/common/ScreenTitle';
import SignatureScreenFooter from '../components/addSignatureScreen/SignatureScreenFooter';
import ForwardedSignatureArea from '../components/addSignatureScreen/SignatureArea';
import {SignatureViewRef} from 'react-native-signature-canvas';
import useDispatchAppLocalData from '../contexts/hooks/useDispatchAppLocalData';
import useCustomNavigate from '../hooks/useCustomNavigate';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';

export default function AddSignatureScreen() {
  const {goBack} = useCustomNavigate();
  const ref = useRef<SignatureViewRef>(null);
  const dispatch = useDispatchAppLocalData();

  const handleOK = () => {
    ref.current?.readSignature();
  };

  const onOk = (signature: string) => {
    dispatch?.setCurrentSignature(signature);
    goBack();
  };

  const handleClear = () => {
    ref.current?.clearSignature();
  };

  return (
    <NonScrollableScreenContainer paddingHorizontal={0.001}>
      <ScreenTitle
        title="Add Signature"
        showBackButton
        paddingHorizontal={COMMONLY_USED_DATA.SCREEN_PADDING}
      />
      <ForwardedSignatureArea onOk={onOk} ref={ref} />
      <SignatureScreenFooter onClear={handleClear} onSave={handleOK} />
    </NonScrollableScreenContainer>
  );
}
