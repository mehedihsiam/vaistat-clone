import {View, StyleSheet} from 'react-native';
import React from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';
import Typography from '../common/Typography';
import Spacer from '../common/Spacer';

type TProps = {
  earning: string;
  // lastWithdrawalRequest: Date;
};

export default function PaymentHistoryEarningCard(props: TProps) {
  const theme = useCustomTheme();

  return (
    <View style={[styles.container, {backgroundColor: theme.DISABLED_BG}]}>
      <View style={[styles.header, {backgroundColor: theme.SUCCESS}]}>
        <Typography color={theme.OPPOSITE_OF_ACCENT}>Total Earning</Typography>
      </View>
      <View style={styles.bodyContainer}>
        <Spacer height={1} />
        <Typography color={theme.ACCENT} fontSize={18} fontWeight="600">
          $ {props.earning}
        </Typography>
        {/* <View
          style={[styles.disabledCard, {backgroundColor: theme.DISABLED_TEXT}]}>
          <Typography
            color={theme.OPPOSITE_OF_ACCENT}
            fontSize={16}
            fontWeight="600">
            Last withdrawal request
          </Typography>
          <Typography
            color={theme.OPPOSITE_OF_ACCENT}
            fontSize={14}
            fontWeight="400">
            {props.lastWithdrawalRequest.toUTCString()}
          </Typography>
        </View> */}
        <Spacer height={1} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    gap: 20,
  },
  disabledCard: {
    width: '100%',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
});
