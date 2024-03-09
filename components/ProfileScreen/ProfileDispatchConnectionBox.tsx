import {View, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';
import Typography from '../common/Typography';
import useAuth from '../../contexts/hooks/useAuth';
import useGetDispatchDetails from '../../APIs/hooks/useGetDispatchDetails';
import useSnackBarSetContext from '../../contexts/hooks/useSnackBarLoadingContext';
import SVGs from '../../assets';
import useLanguage from '../../hooks/useLanguage';

type TDispatchDetails = {
  _id: string;
  dispatchCompanyId: {
    _id: string;
    companyLogoImg: string;
    username: string;
    companyName: string;
    companyAddress: string;
  };
};

export default function ProfileDispatchConnectionBox() {
  const language = useLanguage();
  const theme = useCustomTheme();
  const auth = useAuth();
  const getDispatchDetails = useGetDispatchDetails();
  const snackbar = useSnackBarSetContext();
  const [dispatches, setDispatches] = React.useState<TDispatchDetails[]>([]);

  const handleGetDispatchDetails = async () => {
    const res = await getDispatchDetails({driver_id: auth?._id});
    if (res.code === 200) {
      setDispatches(res.result);
    } else {
      snackbar?.showSnackBar(
        `Error to get Dispatches: ${res.message}`,
        'error'
      );
    }
  };

  useEffect(() => {
    handleGetDispatchDetails();
  }, [auth?._id]);

  return (
    <>
      {dispatches.map(dispatch => (
        <View
          key={dispatch._id}
          style={[styles.container, {backgroundColor: theme.DISABLED_BG}]}>
          <Typography fontWeight="500">
            {language.PROFILE_SCREEN.DISPATCH_CONNECTION}
          </Typography>
          <View style={[styles.highlightedBox]}>
            {SVGs.TickOutline(24, 24)}
            <Typography fontWeight="500" color={theme.ACCENT}>
              {language.COMMON_TEXTS.CONNECTED}
            </Typography>
          </View>
          <Typography textAlign="center" fontWeight="600">
            {dispatch.dispatchCompanyId.companyName}
          </Typography>
          <Typography textAlign="center">
            {dispatch.dispatchCompanyId.companyAddress}
          </Typography>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    gap: 10,
  },
  highlightedBox: {
    width: '100%',
    paddingVertical: 7,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: 'rgba(46, 125, 50, 0.3)',
  },
  flexCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
});
