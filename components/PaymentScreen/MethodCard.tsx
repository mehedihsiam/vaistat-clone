import React from 'react';
import SingleMethodContainer from '../common/SingleMethodContainer';
import PAYMENT_METHODS from '../../constants/PAYMENT_METHODS';
import {TSetState} from '../../types/setStateType';
import MethodHeadingButton from './MethodHeadingButton';
import MethodCardHeading from './MethodCardHeading';
import MethodCardDetails from './MethodCardDetails';

type TMethodCard = {
  selectedMethod: string;
  setSelectedMethod: TSetState<string>;
};

export default function MethodCard(props: TMethodCard) {
  const isActive = props.selectedMethod === PAYMENT_METHODS.CARD;

  const handleMethodSelection = () => {
    props.setSelectedMethod(PAYMENT_METHODS.CARD);
  };
  return (
    <SingleMethodContainer>
      <MethodHeadingButton onPress={handleMethodSelection}>
        <MethodCardHeading isActive={isActive} />
      </MethodHeadingButton>
      {isActive && <MethodCardDetails />}
    </SingleMethodContainer>
  );
}
