import {View, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import InputWithLabel from '../common/InputWithLabel';
import RadioOptions from '../common/RadioOptions';
import FlexRowStart from '../common/FlexRowStart';
import RadioButton from '../common/RadioOptions/RadioButton';
import Typography from '../common/Typography';
import useCustomTheme from '../../hooks/useCustomTheme';
import SingleLine from '../common/SingleLine';
import usePaymentDispatchContext from '../../contexts/hooks/usePaymentDispatchContext';
import getTipsAmount from '../../utils/getTipsAmount';
import usePaymentContext from '../../contexts/hooks/usePaymentContext';

export default function Tips() {
  const theme = useCustomTheme();
  const dispatchPaymentContext = usePaymentDispatchContext();
  const paymentContext = usePaymentContext();
  const [selectedTipsOption, setSelectedTipsOption] = React.useState('5');
  const [customTipsAmount, setCustomTipsAmount] = React.useState('');

  const optionValues = ['5', '10', '15'];
  const options = ['5%', '10%', '15%'];

  const handelPressAmount = (arg: string) => () => {
    setSelectedTipsOption(arg);
  };

  const handleChangeTipsAmount = (tipsAmount: string) => {
    setCustomTipsAmount(tipsAmount);
    dispatchPaymentContext?.setTipsAmount(+tipsAmount);
  };

  const handleFocusCustomAmount = () => {
    setSelectedTipsOption('Amount');
  };

  useEffect(() => {
    const tips = getTipsAmount({
      selectedTipsOption,
      amount: paymentContext?.amount || 0,
      tips: paymentContext?.tipsAmount || 0,
    });
    dispatchPaymentContext?.setTipsAmount(tips);
    if (selectedTipsOption !== 'Amount') {
      setCustomTipsAmount('');
    }
  }, [paymentContext?.amount, paymentContext?.tipsAmount, selectedTipsOption]);

  return (
    <View style={styles.container}>
      <Typography color={theme.DISABLED_TEXT}>Tips</Typography>
      <RadioOptions
        flexRow
        options={options}
        optionValues={optionValues}
        selectedOption={selectedTipsOption}
        setSelectedOption={setSelectedTipsOption}
      />

      <FlexRowStart gap={10} alignItems="center">
        <RadioButton
          option="Amount"
          selected={selectedTipsOption === 'Amount'}
          handlePress={handelPressAmount}
        />
        <InputWithLabel
          label="Amount"
          onFocus={handleFocusCustomAmount}
          value={customTipsAmount}
          onChangeText={handleChangeTipsAmount}
        />
      </FlexRowStart>
      <SingleLine />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10,
    gap: 20,
  },
});
