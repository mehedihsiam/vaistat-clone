import React from 'react';
import SingleMethodContainer from '../common/SingleMethodContainer';
import PAYMENT_METHODS from '../../constants/PAYMENT_METHODS';
import {TSetState} from '../../types/setStateType';
import MethodHeadingButton from './MethodHeadingButton';
import CommonMethodHeading from './CommonMethodHeading';
import MethodDetailsContainer from './MethodDetailsContainer';
import useCustomTheme from '../../hooks/useCustomTheme';
import Button from '../Button';
import useMakePayment from '../../hooks/useMakePayment';
import usePaymentContext from '../../contexts/hooks/usePaymentContext';

type TMethodCard = {
  selectedMethod: string;
  setSelectedMethod: TSetState<string>;
};

export default function MethodCheque(props: TMethodCard) {
  const theme = useCustomTheme();
  const isActive = props.selectedMethod === PAYMENT_METHODS.CHEQUE;
  const makePayment = useMakePayment();
  const paymentContext = usePaymentContext();

  const handlePayment = async () => {
    const totalAmount =
      (paymentContext?.amount || 0) + (paymentContext?.tipsAmount || 0);
    await makePayment(
      totalAmount,
      paymentContext?.job_id || '',
      '3',
      paymentContext?.payerFirstName || ''
    );
  };
  // const [modalVisible, setModalVisible] = React.useState(false);
  // const [image, setImage] = React.useState<Asset | undefined>(undefined);

  const handleMethodSelection = () => {
    props.setSelectedMethod(PAYMENT_METHODS.CHEQUE);
  };

  // const handleAddPicture = () => {
  //   setModalVisible(true);
  // };
  // const handleGetPicture = (asset: Asset | undefined) => {
  //   setModalVisible(false);
  //   setImage(asset);
  // };

  // const getImageHeightWidth = () => {
  //   if (image?.height && image?.width) {
  //     const ratio = image?.height / image?.width;
  //     const width = 100;
  //     const height = width * ratio;
  //     return {width, height};
  //   }
  //   return {width: 0, height: 0};
  // };

  return (
    <>
      {/* <FilePickingModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleGetImage={handleGetPicture}
      /> */}
      <SingleMethodContainer>
        <MethodHeadingButton onPress={handleMethodSelection}>
          <CommonMethodHeading isActive={isActive} title="Cheque" />
        </MethodHeadingButton>
        {isActive && (
          <MethodDetailsContainer>
            <Button
              variant="fillRounded"
              title="Confirm payment"
              backgroundColor={theme.PRIMARY}
              textColor={theme.OPPOSITE_OF_ACCENT}
              onPress={handlePayment}
            />
          </MethodDetailsContainer>
        )}
      </SingleMethodContainer>
    </>
  );
}

// const styles = StyleSheet.create({
//   capturedImage: {
//     maxWidth: '100%',
//   },
// });
