import {View, StyleSheet} from 'react-native';
import React from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';
import Typography from '../common/Typography';

type TAmountCapsule = {
  amount?: string;
};

const AmountCapsule = (props: TAmountCapsule) => {
  const theme = useCustomTheme();
  return (
    <View style={[styles.container, {backgroundColor: theme.PRIMARY}]}>
      <Typography color={theme.OPPOSITE_OF_ACCENT}>${props.amount}</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

export default AmountCapsule;
