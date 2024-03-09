import {useContext} from 'react';
import {PaymentScreenDispatchContext} from '../PaymentScreenContext';

const usePaymentDispatchContext = () => {
  const context = useContext(PaymentScreenDispatchContext);
  return context;
};

export default usePaymentDispatchContext;
