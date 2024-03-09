import React, {Fragment} from 'react';
import useWithdrawalRequest from '../../APIs/hooks/useWithdrawalRequest';
import {LOGGED_IN_ROUTES} from '../../constants/ROUTES';
import useAuth from '../../contexts/hooks/useAuth';
import useDispatchAppLocalData from '../../contexts/hooks/useDispatchAppLocalData';
import useSnackBarSetContext from '../../contexts/hooks/useSnackBarLoadingContext';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import useCustomTheme from '../../hooks/useCustomTheme';
import Button from '../Button';
import OutlineButton from '../common/OutlineButton';
import Spacer from '../common/Spacer';
import Typography from '../common/Typography';
import CustomRightArrow from './CustomRightArrow';
import useLanguage from '../../hooks/useLanguage';

export default function EarningActions() {
  const language = useLanguage();
  const auth = useAuth();
  const dispatchLocalData = useDispatchAppLocalData();
  const snackBar = useSnackBarSetContext();
  const theme = useCustomTheme();
  const {navigate} = useCustomNavigate();
  const withdrawalRequest = useWithdrawalRequest();

  const handleNavigate = () => {
    navigate(LOGGED_IN_ROUTES.PAYMENT_HISTORY);
  };

  const handleSubmitWithdrawal = async () => {
    if (auth?._id) {
      dispatchLocalData?.setIsLoading(true);
      const payload = {
        driver_id: auth._id,
      };
      const res = await withdrawalRequest(payload);

      if (res.code === 200) {
        dispatchLocalData?.setIsLoading(false);
      } else {
        dispatchLocalData?.setIsLoading(false);
        snackBar?.showSnackBar(res.message, 'error');
      }
    }
  };

  return (
    <Fragment>
      <OutlineButton onPress={handleNavigate}>
        <Typography>{language.PROFILE_SCREEN.VIEW_PAYMENT_HISTORY}</Typography>
        <CustomRightArrow />
      </OutlineButton>
      <Spacer height={20} />
      <Button
        onPress={() => handleSubmitWithdrawal()}
        title={language.PROFILE_SCREEN.REQUEST_WITHDRAWAL}
        variant="fillRounded"
        backgroundColor={theme.PRIMARY}
        textColor={theme.OPPOSITE_OF_ACCENT}
      />
    </Fragment>
  );
}
