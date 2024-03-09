import React, {useState} from 'react';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import ScreenTitle from '../components/common/ScreenTitle';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';
import NotDeliveredScreenFooter from '../components/NotDeliveredScreen/NotDeliveredScreenFooter';
import NotDeliveredContent from '../components/NotDeliveredScreen/NotDeliveredContent';
import {Asset} from 'react-native-image-picker';
import {ScreenProps} from '../types/ScreenProps';
import {LoggedInStackParamList} from '../types/stacksParamsList';
import useDispatchAppLocalData from '../contexts/hooks/useDispatchAppLocalData';
import useSnackBarSetContext from '../contexts/hooks/useSnackBarLoadingContext';
import useCustomNavigate from '../hooks/useCustomNavigate';
import useActiveJobDispatchContext from '../contexts/hooks/useActiveJobDispatchContext';
import useNotDelivered from '../APIs/hooks/useNotDelivered';
import useAuth from '../contexts/hooks/useAuth';
import useLanguage from '../hooks/useLanguage';

type Props = ScreenProps<LoggedInStackParamList, 'NotDelivered'>;

export default function NotDeliveredScreen(props: Props) {
  const language = useLanguage();
  const dispatchAppLocal = useDispatchAppLocalData();
  const snackBar = useSnackBarSetContext();
  const {goBack} = useCustomNavigate();
  const dispatchActiveJobs = useActiveJobDispatchContext();
  const notDeliver = useNotDelivered();
  const auth = useAuth();
  const job_id = props.route.params.job_id;

  const [selectedOption, setSelectedOption] = React.useState<string>('');
  const [reason, setReason] = React.useState<string>('');
  const [image, setImage] = useState<Asset | undefined>(undefined);
  const formData = new FormData();

  const handleGetPicture = (asset: Asset | undefined) => {
    setImage(asset);
  };
  const handleSubmit = async () => {
    if (job_id && auth?._id) {
      formData.append('job_id', job_id);
      formData.append('reasonForNotDelivered ', reason);
      formData.append('imageForNotDelivered', {
        uri: image?.uri,
        type: image?.type,
        name: image?.fileName,
      });
      dispatchAppLocal?.setIsLoading(true);
      const res = await notDeliver({driver_id: auth?._id, body: formData});

      if (res.code === 200) {
        dispatchAppLocal?.setIsLoading(false);
        snackBar?.showSnackBar(res.message, 'success');
        await dispatchActiveJobs?.fetchJobList();
        goBack();
      } else {
        dispatchAppLocal?.setIsLoading(false);
        snackBar?.showSnackBar(res.message, 'error');
      }
    }
  };
  return (
    <NonScrollableScreenContainer
      paddingHorizontal={0.0001}
      paddingVertical={0.0001}>
      <ScreenTitle
        showBackButton
        title={language.NOT_DELIVERED_SCREEN.TITLE}
        paddingHorizontal={COMMONLY_USED_DATA.SCREEN_PADDING}
      />
      <NotDeliveredContent
        handleGetImage={handleGetPicture}
        reason={reason}
        setReason={setReason}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <NotDeliveredScreenFooter onPress={handleSubmit} disabled={!reason} />
    </NonScrollableScreenContainer>
  );
}
