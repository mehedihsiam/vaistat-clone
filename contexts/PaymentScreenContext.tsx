import React, {createContext} from 'react';
import {TSetState} from '../types/setStateType';
import useAuth from './hooks/useAuth';

type Props = {
  children: React.ReactNode;
  amount?: number;
  job_id?: string;
};

type TContext = {
  payerFirstName: string;
  payerLastName: string;
  amount: number;
  tipsAmount: number;
  reasonForLessAmount: string;
  job_id?: string;
};

type TDispatch = {
  setPayerFirstName: TSetState<string>;
  setPayerLastName: TSetState<string>;
  setAmount: TSetState<number>;
  setTipsAmount: TSetState<number>;
  setReasonForLessAmount: TSetState<string>;
};

export const PaymentScreenContext = createContext<TContext | undefined>(
  undefined
);
export const PaymentScreenDispatchContext = createContext<
  TDispatch | undefined
>(undefined);

const PaymentScreenArea = (props: Props) => {
  const auth = useAuth();
  const [payerFirstName, setPayerFirstName] = React.useState(
    auth?.first_name || ''
  );
  const [payerLastName, setPayerLastName] = React.useState(
    auth?.last_name || ''
  );
  const [amount, setAmount] = React.useState(props.amount || 0);
  const [tipsAmount, setTipsAmount] = React.useState(0);
  const [reasonForLessAmount, setReasonForLessAmount] = React.useState('');

  const values = {
    payerFirstName,
    payerLastName,
    amount,
    tipsAmount,
    reasonForLessAmount,
    job_id: props?.job_id,
  };

  const dispatch = {
    setPayerFirstName,
    setPayerLastName,
    setAmount,
    setTipsAmount,
    setReasonForLessAmount,
  };

  return (
    <PaymentScreenContext.Provider value={values}>
      <PaymentScreenDispatchContext.Provider value={dispatch}>
        {props.children}
      </PaymentScreenDispatchContext.Provider>
    </PaymentScreenContext.Provider>
  );
};

export default PaymentScreenArea;
