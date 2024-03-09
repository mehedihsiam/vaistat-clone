import {View, StyleSheet} from 'react-native';
import React from 'react';
import SingleLine from '../common/SingleLine';
import PaymentCardContent, {TPaymentCardContent} from './PaymentCardContent';
import Spacer from '../common/Spacer';

type TPaymentCard = TPaymentCardContent;

export default function PaymentCard(props: TPaymentCard) {
  return (
    <View style={styles.container}>
      <SingleLine />
      <Spacer height={10} />

      <PaymentCardContent {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
  },

  logo: {
    height: 50,
    width: 50,
  },
});
