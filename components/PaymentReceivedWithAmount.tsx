import {View} from 'react-native';
import React from 'react';
import SVGs from '../assets';
import Typography from './common/Typography';
import useCustomTheme from '../hooks/useCustomTheme';

type TPaymentReceivedWithAmount = {
  amount: number;
};

export default function PaymentReceivedWithAmount(
  props: TPaymentReceivedWithAmount
) {
  const theme = useCustomTheme();
  return (
    <View>
      {SVGs.TickOutline(128, 128, theme.PRIMARY)}
      <Typography
        color={theme.PRIMARY}
        fontSize={40}
        textAlign="center"
        fontWeight="600">
        $ {props.amount.toFixed(2)}
      </Typography>
      <Typography color={theme.PRIMARY} textAlign="center" fontWeight="600">
        Payment Received
      </Typography>
    </View>
  );
}
