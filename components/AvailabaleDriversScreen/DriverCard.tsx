import React, {Fragment} from 'react';
import {TAuth} from '../../types/auth';
import FlexRowBetween from '../common/FlexRowBetween';
import User from '../../assets/placeholders/user-placeholder.png';
import CircleImage from '../common/CircleImage';
import Typography from '../common/Typography';
import FlexRowStart from '../common/FlexRowStart';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import useLanguage from '../../hooks/useLanguage';
import useCustomTheme from '../../hooks/useCustomTheme';
import Divider from '../common/Devider';
import useSendTransferJobRequest from '../../APIs/hooks/useSendTransferJobRequest';
import useLocationContext from '../../contexts/hooks/useLocationContext';
import useSnackBarSetContext from '../../contexts/hooks/useSnackBarLoadingContext';
import useAuth from '../../contexts/hooks/useAuth';

type TDriverCard = {
  driver: TAuth;
  job_id: string;
};

const DriverCard = (props: TDriverCard) => {
  const language = useLanguage();
  const theme = useCustomTheme();
  const locationContext = useLocationContext();
  const sendTransferRequest = useSendTransferJobRequest();
  const snackbarContext = useSnackBarSetContext();
  const auth = useAuth();

  const [loading, setLoading] = React.useState(false);
  const [transferred, setTransferred] = React.useState(false);

  const handleTransferJob = async () => {
    if (locationContext?.location && auth) {
      setLoading(true);
      const res = await sendTransferRequest({
        job_id: props.job_id,
        driver_id: auth._id,
        selected_driver_id: props.driver._id,
        transfer_driver_lat_long: [
          locationContext?.location?.latitude,
          locationContext?.location?.longitude,
        ],
        transfer_driver_location: locationContext.address || '',
      });
      if (res.code === 200) {
        setTransferred(true);
      } else {
        snackbarContext?.showSnackBar(res.message, 'error');
      }
      console.log(res);
      setLoading(false);
    }
  };

  const handleCancelRequest = () => {
    setTransferred(false);
  };

  const handlePress = () => {
    if (transferred) {
      handleCancelRequest();
    } else {
      handleTransferJob();
    }
  };

  return (
    <Fragment>
      <FlexRowBetween paddingVertical={10} alignItems="center">
        <FlexRowStart>
          <CircleImage size={40} placeholder={User} />
          <Typography>{props.driver.first_name}</Typography>
        </FlexRowStart>

        <TouchableOpacity
          activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
          style={[
            styles.button,
            {backgroundColor: transferred ? theme.DANGER : theme.PRIMARY},
          ]}
          onPress={handlePress}>
          {loading ? (
            <ActivityIndicator color={theme.OPPOSITE_OF_ACCENT} />
          ) : (
            <Typography color={theme.OPPOSITE_OF_ACCENT}>
              {transferred
                ? language.AVAILABLE_DRIVERS_SCREEN.CANCEL_REQUEST
                : language.AVAILABLE_DRIVERS_SCREEN.TRANSFER}
            </Typography>
          )}
        </TouchableOpacity>
      </FlexRowBetween>
      <Divider />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 'auto',
    minWidth: 100,
    height: 35,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DriverCard;
