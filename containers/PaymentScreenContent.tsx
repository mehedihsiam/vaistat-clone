import {StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import NonScrollableScreenContainer from './NonScrollableScreenContainer';
import ScreenTitle from '../components/common/ScreenTitle';
import PayerName from '../components/PaymentScreen/PayerName';
import CollectedAmount from '../components/PaymentScreen/CollectedAmount';
import PaymentFooter from '../components/PaymentScreen/PaymentFooter';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';
import Tips from '../components/PaymentScreen/Tips';
import PaymentMethod from '../components/PaymentScreen/PaymentMethod';

import usePaymentDispatchContext from '../contexts/hooks/usePaymentDispatchContext';
import usePaymentContext from '../contexts/hooks/usePaymentContext';

type Props = {
  collectableAmount?: number;
};

export default function PaymentScreenContent(props: Props) {
  const dispatchPaymentContext = usePaymentDispatchContext();
  const paymentContext = usePaymentContext();

  const collectableAmount = props?.collectableAmount || 0;

  const handleChangeFirstName = (firstName: string) => {
    dispatchPaymentContext?.setPayerFirstName(firstName);
  };

  const handleChangeLastName = (lastName: string) => {
    dispatchPaymentContext?.setPayerLastName(lastName);
  };

  return (
    <NonScrollableScreenContainer
      paddingVertical={0.01}
      paddingHorizontal={0.00001}>
      <ScreenTitle
        title="Payment"
        showBackButton
        paddingHorizontal={COMMONLY_USED_DATA.SCREEN_PADDING}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={styles.scrollContainer}>
        <PayerName
          firstName={{
            placeholder: 'First name',
            value: paymentContext?.payerFirstName,
            onChangeText: handleChangeFirstName,
          }}
          lastName={{
            placeholder: 'Last name',
            value: paymentContext?.payerLastName,
            onChangeText: handleChangeLastName,
          }}
        />
        <CollectedAmount fullAmount={collectableAmount} />
        <Tips />
        <PaymentMethod />
      </ScrollView>
      <PaymentFooter />
    </NonScrollableScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingHorizontal: COMMONLY_USED_DATA.SCREEN_PADDING,
  },
});
