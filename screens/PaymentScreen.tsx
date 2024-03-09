import React from 'react';
import PaymentScreenArea from '../contexts/PaymentScreenContext';
import PaymentScreenContent from '../containers/PaymentScreenContent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInStackParamList} from '../types/stacksParamsList';

type Props = NativeStackScreenProps<LoggedInStackParamList, 'Payment'>;
const PaymentScreen = (props: Props) => {
  /** ==============================
   *  NOTE: This screen has so many props drilling. To avoid unnecessary props drilling, it's better to use context instead of props drilling.
   * ==============================**/

  return (
    <PaymentScreenArea
      job_id={props.route.params.job_id}
      amount={props.route.params.collectableAmount}>
      <PaymentScreenContent
        collectableAmount={props.route.params.collectableAmount}
      />
    </PaymentScreenArea>
  );
};

export default PaymentScreen;
