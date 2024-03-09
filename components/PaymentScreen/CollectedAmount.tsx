import {View, StyleSheet} from 'react-native';
import React from 'react';
import Typography from '../common/Typography';
import useCustomTheme from '../../hooks/useCustomTheme';
import Spacer from '../common/Spacer';
import FlexRowBetween from '../common/FlexRowBetween';
import OutlineButton from '../common/OutlineButton';

import InputWithLabel from '../common/InputWithLabel';
import InputField from '../common/InputField';
import usePaymentDispatchContext from '../../contexts/hooks/usePaymentDispatchContext';
import usePaymentContext from '../../contexts/hooks/usePaymentContext';

type TCollectedAmount = {
  fullAmount: number;
  // amountToPay: number;
  // input: TCommonInputField;
};

export default function CollectedAmount(props: TCollectedAmount) {
  const theme = useCustomTheme();
  const dispatchPaymentContext = usePaymentDispatchContext();
  const paymentContext = usePaymentContext();
  const amountToPay = paymentContext?.amount || 0;

  const handleChangeReason = (reason: string) => {
    dispatchPaymentContext?.setReasonForLessAmount(reason);
  };

  const handleChangeAmount = (amount: string) => {
    dispatchPaymentContext?.setAmount(+amount);
  };

  const setFullAmount = () => {
    dispatchPaymentContext?.setAmount(props.fullAmount);
  };

  return (
    <View style={styles.container}>
      <Spacer height={20} />
      <Typography color={theme.DISABLED_TEXT}>Collected Amount</Typography>
      <Spacer height={10} />
      <FlexRowBetween alignItems="flex-start" gap={10}>
        <InputWithLabel
          label="Enter Amount"
          onChangeText={handleChangeAmount}
          value={amountToPay.toString()}
          placeholder="$0.00"
          keyboardType="number-pad"
        />
        <OutlineButton onPress={setFullAmount}>
          <Typography color={theme.ACCENT}>
            Full amount ${props.fullAmount.toFixed(2)}
          </Typography>
        </OutlineButton>
      </FlexRowBetween>
      <Spacer height={20} />
      {amountToPay < props.fullAmount && (
        <InputField
          multiline
          height={150}
          numberOfLines={100}
          textAlignVertical="top"
          onChangeText={handleChangeReason}
          placeholder="Why wasn’t the full amount collected."
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
