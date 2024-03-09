import {useContext} from 'react';
import {PaymentScreenContext} from '../PaymentScreenContext';

const usePaymentContext = () => {
  const context = useContext(PaymentScreenContext);
  return context;
};

export default usePaymentContext;
