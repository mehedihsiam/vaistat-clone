import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Button from '../../components/Button';
import FlexRowBetween from '../../components/common/FlexRowBetween';
import useCustomTheme from '../../hooks/useCustomTheme';
import {TSetState} from '../../types/setStateType';
import ModalContainer from '../ModalContainer';
import ModalHeader from '../ModalHeader';
import InputField from '../../components/common/InputField';
import CancelJobAlert from '../../components/CancelJobAlert';
import useCancelJob from '../../APIs/hooks/useCancelJob';
import useDispatchAppLocalData from '../../contexts/hooks/useDispatchAppLocalData';
import useSnackBarSetContext from '../../contexts/hooks/useSnackBarLoadingContext';
import useAuth from '../../contexts/hooks/useAuth';
import useActiveJobDispatchContext from '../../contexts/hooks/useActiveJobDispatchContext';
import useLanguage from '../../hooks/useLanguage';

type TJobCancelModal = {
  open: boolean;
  setOpen: TSetState<boolean>;
  job_id: string | undefined;
};
const JobCancelModal = (props: TJobCancelModal) => {
  const language = useLanguage();
  const theme = useCustomTheme();
  const cancelJob = useCancelJob();
  const dispatchAppLocal = useDispatchAppLocalData();
  const snackbar = useSnackBarSetContext();
  const auth = useAuth();
  const dispatchActiveJobs = useActiveJobDispatchContext();
  const [reason, setReason] = useState('');

  const handleModalClose = () => {
    props.setOpen(false);
  };

  const handleConfirmCancellation = async () => {
    if (auth?._id && props.job_id) {
      dispatchAppLocal?.setIsLoading(true);
      const res = await cancelJob({
        cancel_note_driver: reason,
        job_id: props.job_id,
        driver_id: auth?._id,
      });

      if (res.code === 200) {
        await dispatchActiveJobs?.fetchJobList();
        dispatchAppLocal?.setIsLoading(false);
        snackbar?.showSnackBar(res.message, 'success');
        handleModalClose();
      } else {
        dispatchAppLocal?.setIsLoading(false);
        snackbar?.showSnackBar(res.message, 'error');
      }
    } else {
      snackbar?.showSnackBar('Something went wrong', 'error');
    }
  };

  const handleChangeText = (text: string) => {
    setReason(text);
  };

  return (
    <ModalContainer modalVisible={props.open} setModalVisible={props.setOpen}>
      <View style={styles.modalView}>
        <ModalHeader
          title={language.READY_DELIVERY_SCREEN.CANCEL}
          showCrossButton
          setOpen={props.setOpen}
        />
        <InputField
          placeholder={language.READY_DELIVERY_SCREEN.ENTER_REASON}
          onChangeText={handleChangeText}
          height={220}
          textAlignVertical="top"
        />
        <CancelJobAlert />
        <FlexRowBetween gap={10} paddingHorizontal={5} paddingVertical={10}>
          <Button
            variant="fillRounded"
            title={language.COMMON_TEXTS.CANCEL}
            width="auto"
            flex={1}
            backgroundColor={theme.DISABLED_BG}
            textColor={theme.ACCENT}
            onPress={handleModalClose}
          />
          <Button
            variant="fillRounded"
            title={language.COMMON_TEXTS.CONFIRM}
            backgroundColor={theme.DANGER}
            textColor={theme.OPPOSITE_OF_ACCENT}
            width="auto"
            flex={1}
            onPress={handleConfirmCancellation}
            disabled={!reason}
          />
        </FlexRowBetween>
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: '100%',
    height: 380,
    backgroundColor: 'white',
    padding: 16,
    gap: 15,
    borderRadius: 16,
  },
});

export default JobCancelModal;
