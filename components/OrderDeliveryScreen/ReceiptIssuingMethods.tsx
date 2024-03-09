import {View, StyleSheet} from 'react-native';
import React from 'react';
import RadioButtonWithNestedComponent from '../common/RadioButtonWithNestedComponent';
import PhoneInput from '../common/PhoneInput';
import InputField from '../common/InputField';
import Typography from '../common/Typography';
import useCustomTheme from '../../hooks/useCustomTheme';

type TReceiptIssuingMethods = {
  selectedMethod: string;
  setSelectedMethod: (arg: string) => void;
};

export default function ReceiptIssuingMethods(props: TReceiptIssuingMethods) {
  const {selectedMethod, setSelectedMethod} = props;
  const theme = useCustomTheme();

  const handleSelect = (method: string) => () => {
    setSelectedMethod(method);
  };

  return (
    <View style={styles.container}>
      <Typography color={theme.DISABLED_TEXT}>
        How do you want to get the receipt?
      </Typography>
      {/* <RadioButtonWithNestedComponent
        onPress={handleSelect('Print')}
        isActive={selectedMethod === 'Print'}
        title="Print"
        activeChildren={null}
      /> */}
      <RadioButtonWithNestedComponent
        onPress={handleSelect('Email')}
        isActive={selectedMethod === 'Email'}
        title="Email"
        activeChildren={<InputField height={56} placeholder="Enter Email" />}
      />
      <RadioButtonWithNestedComponent
        onPress={handleSelect('SMS')}
        isActive={selectedMethod === 'SMS'}
        title="SMS"
        activeChildren={
          <PhoneInput height={65} placeholder="Enter Phone Number" />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    gap: 10,
  },
});
