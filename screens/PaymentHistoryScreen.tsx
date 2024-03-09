import React, {useEffect} from 'react';
import CommonScreenContainer from '../containers/CommonScreenContainer';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';
import PaymentHistoryEarningCard from '../components/PaymentHistoryScreen/PaymentHistoryEarningCard';
import PaymentCard from '../components/PaymentHistoryScreen/PaymentCard';
import Spacer from '../components/common/Spacer';
import useAuth from '../contexts/hooks/useAuth';
import useGetRideTransactions from '../APIs/hooks/useGetRideTransactions';
import useSnackBarSetContext from '../contexts/hooks/useSnackBarLoadingContext';
import useDispatchAppLocalData from '../contexts/hooks/useDispatchAppLocalData';
import {TPaymentHistory, TPaymentHistoryData} from '../types/paymentHistory';
import {View, useWindowDimensions} from 'react-native';
import NoTaskField from '../components/NoTaskField';
import useLanguage from '../hooks/useLanguage';

export default function PaymentHistoryScreen() {
  const language = useLanguage();
  const {height} = useWindowDimensions();
  const auth = useAuth();
  const paymentHistory = useGetRideTransactions();
  const snackbarContext = useSnackBarSetContext();
  const dispatchLocalApp = useDispatchAppLocalData();

  const [historyResponse, setHistoryResponse] = React.useState<
    TPaymentHistory | undefined
  >();
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchPaymentHistory = async () => {
    if (auth?._id) {
      dispatchLocalApp?.setIsLoading(true);
      const res = await paymentHistory({driver_id: auth._id});
      if (res.code === 200) {
        setRefreshing(false);
        setHistoryResponse(res);
      } else {
        snackbarContext?.showSnackBar(res.message, 'error');
      }

      dispatchLocalApp?.setIsLoading(false);
    }
  };

  const getPaymentStatus = (payment: TPaymentHistoryData) => {
    if (!payment.settled) {
      return language.PAYMENT_HISTORY_SCREEN.PROCESSING;
    } else if (payment.settled && !payment.paid) {
      return language.PAYMENT_HISTORY_SCREEN.PENDING;
    } else if (payment.paid) {
      return language.PAYMENT_HISTORY_SCREEN.PAID;
    } else {
      return language.PAYMENT_HISTORY_SCREEN.PROCESSING;
    }
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, []);
  // const FILTER_KEY = FILTER_KEYS.PAYMENT_HISTORY;
  // const filterContext = useFilterContext();

  // const toggleFilterDrawer = () => {
  //   filterContext?.showFilter(FILTER_KEY);
  // };

  return (
    <CommonScreenContainer
      onRefresh={fetchPaymentHistory}
      refreshing={refreshing}
      screenTitleProps={{
        title: language.PAYMENT_HISTORY_SCREEN.TITLE,
        showBackButton: true,
        paddingHorizontal: COMMONLY_USED_DATA.SCREEN_PADDING,
      }}>
      <PaymentHistoryEarningCard earning={'0.00'} />
      {historyResponse?.result?.length! > 0 ? (
        historyResponse?.result.map(item => (
          <PaymentCard
            key={item._id}
            date={new Date(item.createdAt)}
            earning={item.cash_amount + item.cheque_amount}
            fromLocation={item.job_id.pick_up_location}
            status={getPaymentStatus(item)}
            toLocation={item.job_id.drop_off_location}
          />
        ))
      ) : (
        <View style={{flex: 1, height: height - 250}}>
          <NoTaskField text={language.PAYMENT_HISTORY_SCREEN.EMPTY} />
        </View>
      )}
      <Spacer height={50} />
    </CommonScreenContainer>
  );
}
