import {View, StyleSheet} from 'react-native';
import React from 'react';
import FlexRowBetween from '../common/FlexRowBetween';
import InputField from '../common/InputField';
import {TCommonInputField} from '../../types/inputCommonProps';
import Typography from '../common/Typography';
import useCustomTheme from '../../hooks/useCustomTheme';
import SingleLine from '../common/SingleLine';

type TInputField = TCommonInputField & {};

type TPayerName = {
  firstName: TInputField;
  lastName: TInputField;
};

export default function PayerName(props: TPayerName) {
  const theme = useCustomTheme();
  return (
    <View style={styles.container}>
      <Typography color={theme.DISABLED_TEXT}>Payer</Typography>
      <FlexRowBetween gap={10}>
        <InputField {...props.firstName} />
        <InputField {...props.lastName} />
      </FlexRowBetween>
      <SingleLine />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
