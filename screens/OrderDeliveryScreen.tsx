import React, {useEffect} from 'react';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import ScreenTitle from '../components/common/ScreenTitle';
import OrderDeliveryScreenFooter from '../components/OrderDeliveryScreen/OrderDeliveryScreenFooter';
import {useFormik} from 'formik';
import {ScrollView, StyleSheet} from 'react-native';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';

import OrderReceivedBy from '../components/OrderDeliveryScreen/OrderReceivedBy';
import ReceiptIssuingMethods from '../components/OrderDeliveryScreen/ReceiptIssuingMethods';
import InputField from '../components/common/InputField';
import OutlineButton from '../components/common/OutlineButton';
import SVGs from '../assets';
import Typography from '../components/common/Typography';
import Spacer from '../components/common/Spacer';
import FilePickingModal from '../components/common/FilePickingModal';
import {Asset} from 'react-native-image-picker';
import {ScreenProps} from '../types/ScreenProps';
import {LoggedInStackParamList} from '../types/stacksParamsList';
import useLocalAppData from '../contexts/hooks/useLocalAppData';
import useDispatchAppLocalData from '../contexts/hooks/useDispatchAppLocalData';
import getFileObject from '../utils/getFileObject';
import base64ToFile from '../utils/base64ToFile';
import useCompleteJob from '../APIs/hooks/useCompleteJob';
import useAuth from '../contexts/hooks/useAuth';
import useSnackBarSetContext from '../contexts/hooks/useSnackBarLoadingContext';
import useActiveJobDispatchContext from '../contexts/hooks/useActiveJobDispatchContext';
import useCustomNavigate from '../hooks/useCustomNavigate';
import {LOGGED_IN_ROUTES} from '../constants/ROUTES';
import ImageOutput from '../components/OrderDeliveryScreen/ImageOutput';
import useLanguage from '../hooks/useLanguage';

type Props = ScreenProps<LoggedInStackParamList, 'OrderDelivery'>;
export default function OrderDeliveryScreen(props: Props) {
  const language = useLanguage();
  const params = props.route.params;
  const auth = useAuth();
  const {navigate} = useCustomNavigate();
  const completeJob = useCompleteJob();
  const localAppData = useLocalAppData();
  const dispatchLocalApp = useDispatchAppLocalData();
  const dispatchActiveJobs = useActiveJobDispatchContext();
  const snackbarContext = useSnackBarSetContext();
  const [isVisibleFilePickingModal, setIsVisibleFilePickingModal] =
    React.useState(false);
  const [selectedReceiptIssuingMethod, setSelectedReceiptIssuingMethod] =
    React.useState('');

  const [image, setImage] = React.useState<Asset | undefined>();

  const formik = useFormik({
    initialValues: {
      receiver: '',
      note: '',
      email:
        selectedReceiptIssuingMethod === language.ORDER_DELIVERY_SCREEN.EMAIL
          ? ''
          : undefined,
      phone:
        selectedReceiptIssuingMethod === language.ORDER_DELIVERY_SCREEN.SMS
          ? ''
          : undefined,
    },
    onSubmit: () => {},
  });

  const getFormData = () => {
    const formData = new FormData();
    formData.append('dropoff_note', formik.values.note);
    formData.append('order_received_by', formik.values.receiver);
    formData.append('receiver_name', formik.values.receiver);
    if (image) {
      formData.append('dropoff_images', getFileObject(image));
    }
    if (localAppData.currentSignature) {
      formData.append(
        'customer_signature',
        base64ToFile(
          localAppData.currentSignature || '',
          `signature-for-order-${props.route.params.job_id}.png`,
          'image/png'
        )
      );
    }
    return formData;
  };

  const handleDeliveryDone = async () => {
    if (auth?._id) {
      dispatchLocalApp?.setIsLoading(true);
      const formData = getFormData();
      const res = await completeJob({
        driver_id: auth?._id,
        job_id: params.job_id,
        body: formData,
      });
      if (res.code === 200) {
        await dispatchActiveJobs?.fetchJobList();
        dispatchLocalApp?.setCurrentSignature(null);
        snackbarContext?.showSnackBar(
          'Order delivered successfully',
          'success'
        );
        navigate(LOGGED_IN_ROUTES.ACTIVE_JOBS);
      } else {
        snackbarContext?.showSnackBar(res.message, 'error');
      }
      dispatchLocalApp?.setIsLoading(false);
    } else {
      snackbarContext?.showSnackBar('Please login first', 'error');
    }
  };
  const handleGetImage = (asset: Asset | undefined) => {
    setImage(asset);
  };

  const handleOpenModal = () => {
    setIsVisibleFilePickingModal(true);
  };

  const handleSetReceiver = (receiver: string) => {
    formik.setFieldValue('receiver', receiver);
  };

  const handelDeleteAsset = () => {
    setImage(undefined);
  };

  useEffect(() => {
    dispatchLocalApp?.setCurrentSignature(null);
  }, []);

  return (
    <NonScrollableScreenContainer paddingHorizontal={0.001}>
      <FilePickingModal
        handleGetImage={handleGetImage}
        modalVisible={isVisibleFilePickingModal}
        setModalVisible={setIsVisibleFilePickingModal}
      />
      <ScreenTitle
        title={language.ORDER_DELIVERY_SCREEN.TITLE}
        showBackButton
        paddingHorizontal={COMMONLY_USED_DATA.SCREEN_PADDING}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.contentContainer}>
        <OrderReceivedBy
          setReceiver={handleSetReceiver}
          patientName={`(${params.customer_name})`}
        />

        {props.route.params.collectedAmount > 0 && (
          <ReceiptIssuingMethods
            selectedMethod={selectedReceiptIssuingMethod}
            setSelectedMethod={setSelectedReceiptIssuingMethod}
          />
        )}
        <InputField
          multiline
          height={130}
          textAlignVertical="top"
          numberOfLines={100}
          placeholder={language.ORDER_DELIVERY_SCREEN.ADD_NOTE}
          onChangeText={formik.handleChange('note')}
        />
        {image && (
          <ImageOutput
            source={{uri: image?.uri}}
            widthRatio={(image.height || 1) / (image.width || 1)}
            onDelete={handelDeleteAsset}
          />
        )}
        <OutlineButton onPress={handleOpenModal}>
          {image ? SVGs.Pencil(24, 24, 'black') : SVGs.Plus(24, 24, 'black')}
          <Typography>{image ? 'Edit' : 'Add'} Picture</Typography>
        </OutlineButton>
        <Spacer height={30} />
      </ScrollView>
      <OrderDeliveryScreenFooter
        onDone={handleDeliveryDone}
        collectedAmount={props.route.params.collectedAmount}
      />
    </NonScrollableScreenContainer>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: COMMONLY_USED_DATA.SCREEN_PADDING,
  },
});
