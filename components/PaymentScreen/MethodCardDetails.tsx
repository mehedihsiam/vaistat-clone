import React from 'react';
import InputWithLabel from '../common/InputWithLabel';
import OutlineButton from '../common/OutlineButton';
import Typography from '../common/Typography';
import Button from '../Button';
import useCustomTheme from '../../hooks/useCustomTheme';
import SVGs from '../../assets';
import MethodDetailsContainer from './MethodDetailsContainer';
import NFCScanningModal from '../NFCScanningModal';

import NfcManager, {NdefRecord, NfcTech} from 'react-native-nfc-manager';
import FlexRowBetween from '../common/FlexRowBetween';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import useCreatePaymentToken from '../../APIs/hooks/useCreatePaymentToken';
import useDispatchAppLocalData from '../../contexts/hooks/useDispatchAppLocalData';
import useProcessPayment, {
  TPaymentProcessingPayload,
} from '../../APIs/hooks/useProcessPayment';
import useAuth from '../../contexts/hooks/useAuth';
import usePaymentContext from '../../contexts/hooks/usePaymentContext';
import useSnackBarSetContext from '../../contexts/hooks/useSnackBarLoadingContext';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import {LOGGED_IN_ROUTES} from '../../constants/ROUTES';
import useMakePayment from '../../hooks/useMakePayment';

type TFormikValues = {
  number: string;
  expirationMonth: string;
  expirationYear: string;
  cvc: string;
};

export default function MethodCardDetails() {
  const theme = useCustomTheme();
  const dispatchApp = useDispatchAppLocalData();
  const createPaymentToken = useCreatePaymentToken();
  const makePayment = useMakePayment();
  const auth = useAuth();
  const paymentContext = usePaymentContext();
  const snackBar = useSnackBarSetContext();

  const [isVisibleModal, setIsVisibleModal] = React.useState(false);
  const [isNfcPaymentSucceeded, setIsNfcPaymentSucceeded] =
    React.useState(false);
  const [isNfcSupported, setIsNfcSupported] = React.useState(true);
  const [record, setRecord] = React.useState<NdefRecord[] | null>(null);

  const handleCreatePaymentToken = async (values: TFormikValues) => {
    if (auth?._id) {
      dispatchApp?.setIsLoading(true, 'Creating payment token...');
      const cleanedObject = {
        number: values.number,
        cvc: +values.cvc,
        expirationMonth: +values.expirationMonth,
        expirationYear: +values.expirationYear,
      };

      const res = await createPaymentToken(cleanedObject);
      if (res.code === 200) {
        const totalAmount =
          (paymentContext?.amount || 0) + (paymentContext?.tipsAmount || 0);
        await makePayment(
          totalAmount,
          paymentContext?.job_id || '',
          '1',
          res.result,
          paymentContext?.payerFirstName || ''
        );
      } else {
        snackBar?.showSnackBar(res.message, 'error');
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      number: '',
      expirationMonth: '',
      expirationYear: '',
      cvc: '',
    },
    validationSchema: Yup.object({
      number: Yup.string().required('Please enter your card number'),
      expirationMonth: Yup.string().max(2, 'Invalid').required('Expiry Month'),
      expirationYear: Yup.string().max(4, 'Invalid').required('Expiry Year'),
      cvc: Yup.string().max(3, 'Invalid').min(3, 'Invalid').required('CVC'),
    }),
    onSubmit: values => {
      handleCreatePaymentToken(values);
    },
  });

  const readNdef = async () => {
    try {
      if (isNfcSupported) {
        NfcManager.start();
        setIsVisibleModal(true);
        await NfcManager.requestTechnology(NfcTech.Ndef);
        // the resolved tag object will contain `ndefMessage` property
        const tag = await NfcManager.getTag();

        if (tag) {
          setRecord(tag.ndefMessage);
          setIsVisibleModal(false);
        }
      }
    } catch (ex) {
      setIsVisibleModal(false);
      setIsNfcPaymentSucceeded(false);
      console.warn('Oops!', ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  const checkNfcSupport = async () => {
    const isSupported = await NfcManager.isSupported();

    setIsNfcSupported(isSupported);
  };

  React.useEffect(() => {
    checkNfcSupport();
  }, []);

  return (
    <>
      {isVisibleModal && (
        <NFCScanningModal
          modalVisible={isVisibleModal}
          setModalVisible={setIsVisibleModal}
          isSucceeded={isNfcPaymentSucceeded}
        />
      )}
      <MethodDetailsContainer>
        <InputWithLabel
          label="Card Number"
          hideLeftIcon
          value={formik.values.number}
          onChangeText={formik.handleChange('number')}
          error={formik.touched.number ? formik.errors.number : undefined}
          onBlur={formik.handleBlur('number')}
        />

        <FlexRowBetween gap={10}>
          <InputWithLabel
            maxLength={2}
            label="Expiry Month"
            placeholder="MM"
            hideLeftIcon
            value={formik.values.expirationMonth}
            onChangeText={formik.handleChange('expirationMonth')}
            error={
              formik.touched.expirationMonth
                ? formik.errors.expirationMonth
                : undefined
            }
            onBlur={formik.handleBlur('expirationMonth')}
          />
          <InputWithLabel
            maxLength={4}
            label="Expiry Year"
            placeholder="YYYY"
            hideLeftIcon
            value={formik.values.expirationYear}
            onChangeText={formik.handleChange('expirationYear')}
            error={
              formik.touched.expirationYear
                ? formik.errors.expirationYear
                : undefined
            }
            onBlur={formik.handleBlur('expirationYear')}
          />
          <InputWithLabel
            label="CVC"
            maxLength={3}
            hideLeftIcon
            value={formik.values.cvc}
            onChangeText={formik.handleChange('cvc')}
            error={formik.touched.cvc ? formik.errors.cvc : undefined}
            onBlur={formik.handleBlur('cvc')}
          />
        </FlexRowBetween>
        {isNfcSupported && (
          <OutlineButton onPress={readNdef}>
            {SVGs.NFC(24, 24, theme.ACCENT)}
            <Typography>Scan Card</Typography>
          </OutlineButton>
        )}
        <Button
          variant="fillRounded"
          title="Pay now"
          backgroundColor={theme.PRIMARY}
          textColor={theme.OPPOSITE_OF_ACCENT}
          disabled={!formik.isValid}
          onPress={formik.handleSubmit}
        />
      </MethodDetailsContainer>
    </>
  );
}
