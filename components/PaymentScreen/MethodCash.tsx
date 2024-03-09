import React from 'react';
import SingleMethodContainer from '../common/SingleMethodContainer';
import MethodHeadingButton from './MethodHeadingButton';
import PAYMENT_METHODS from '../../constants/PAYMENT_METHODS';
import {TSetState} from '../../types/setStateType';
import CommonMethodHeading from './CommonMethodHeading';
import Button from '../Button';
import useCustomTheme from '../../hooks/useCustomTheme';
import MethodDetailsContainer from './MethodDetailsContainer';
import useMakePayment from '../../hooks/useMakePayment';
import usePaymentContext from '../../contexts/hooks/usePaymentContext';

type TMethodCash = {
  selectedMethod: string;
  setSelectedMethod: TSetState<string>;
};

export default function MethodCash(props: TMethodCash) {
  const theme = useCustomTheme();
  const isActive = props.selectedMethod === PAYMENT_METHODS.CASH;
  const makePayment = useMakePayment();
  const paymentContext = usePaymentContext();

  const handlePayment = async () => {
    const totalAmount =
      (paymentContext?.amount || 0) + (paymentContext?.tipsAmount || 0);
    await makePayment(
      totalAmount,
      paymentContext?.job_id || '',
      '2',
      paymentContext?.payerFirstName || ''
    );
  };

  const handleMethodSelection = () => {
    props.setSelectedMethod(PAYMENT_METHODS.CASH);
  };
  return (
    <SingleMethodContainer>
      <MethodHeadingButton onPress={handleMethodSelection}>
        <CommonMethodHeading isActive={isActive} title="Cash" />
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
  );
}
