import {View, StyleSheet} from 'react-native';
import React from 'react';
import Typography from '../common/Typography';
import useCustomTheme from '../../hooks/useCustomTheme';
import MethodCard from './MethodCard';
import MethodCash from './MethodCash';
import MethodCheque from './MethodCheque';

export default function PaymentMethod() {
  const theme = useCustomTheme();
  const [selectedMethod, setSelectedMethod] = React.useState('');
  return (
    <View style={styles.container}>
      <Typography color={theme.DISABLED_TEXT}>Payment Method</Typography>

      <MethodCard
        selectedMethod={selectedMethod}
        setSelectedMethod={setSelectedMethod}
      />

      <MethodCash
        selectedMethod={selectedMethod}
        setSelectedMethod={setSelectedMethod}
      />

      <MethodCheque
        selectedMethod={selectedMethod}
        setSelectedMethod={setSelectedMethod}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
    gap: 10,
  },
});
