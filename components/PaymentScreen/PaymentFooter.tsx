import {View, StyleSheet} from 'react-native';
import React from 'react';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import FlexRowBetween from '../common/FlexRowBetween';
import useCustomTheme from '../../hooks/useCustomTheme';
import Typography from '../common/Typography';
import usePaymentContext from '../../contexts/hooks/usePaymentContext';

export default function PaymentFooter() {
  const theme = useCustomTheme();
  const paymentContext = usePaymentContext();

  const total =
    (paymentContext?.amount || 0) + (paymentContext?.tipsAmount || 0);

  return (
    <View style={styles.container}>
      <View style={[styles.paymentCard, {backgroundColor: theme.PRIMARY_THIN}]}>
        <FlexRowBetween>
          <Typography>Collected Amount</Typography>
          <Typography>$ {paymentContext?.amount.toFixed(2)}</Typography>
        </FlexRowBetween>
        <FlexRowBetween>
          <Typography>Tips</Typography>
          <Typography>$ {paymentContext?.tipsAmount.toFixed(2)}</Typography>
        </FlexRowBetween>
        <FlexRowBetween>
          <Typography fontWeight="700">Payable Amount</Typography>
          <Typography fontWeight="700">$ {total.toFixed(2)}</Typography>
        </FlexRowBetween>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: COMMONLY_USED_DATA.SCREEN_PADDING,
  },
  paymentCard: {
    width: '100%',
    padding: COMMONLY_USED_DATA.SCREEN_PADDING,
    borderRadius: 16,
  },
});
