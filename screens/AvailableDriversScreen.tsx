import {FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {ScreenProps} from '../types/ScreenProps';
import {LoggedInStackParamList} from '../types/stacksParamsList';
import useLanguage from '../hooks/useLanguage';
import useDispatchAppLocalData from '../contexts/hooks/useDispatchAppLocalData';
import useGetAvailableDriversToTransferJob from '../APIs/hooks/useGetAvailableDriversToTransferJob';
import useAuth from '../contexts/hooks/useAuth';
import {TAuth} from '../types/auth';
import DriverCard from '../components/AvailabaleDriversScreen/DriverCard';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import ScreenTitle from '../components/common/ScreenTitle';
import ListEmptyComponent from '../components/ListEmptyComponent';

type Props = ScreenProps<LoggedInStackParamList, 'AvailableDrivers'>;

const AvailableDriversScreen = (props: Props) => {
  const language = useLanguage();
  const auth = useAuth();
  const job_id = props.route.params.job_id;

  const dispatchAppData = useDispatchAppLocalData();
  const getDrivers = useGetAvailableDriversToTransferJob();
  const [drivers, setDrivers] = React.useState<TAuth[]>([]);

  const fetchDrivers = async () => {
    if (auth?._id && job_id) {
      dispatchAppData?.setIsLoading(true);
      const res = await getDrivers({
        driver_id: auth?._id,
        job_id,
      });

      if (res.code === 200) {
        setDrivers(res.result);
        dispatchAppData?.setIsLoading(false);
      } else {
        dispatchAppData?.setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, [auth?._id, job_id]);

  return (
    <NonScrollableScreenContainer paddingVertical={0.001}>
      <ScreenTitle
        showBackButton
        title={language.AVAILABLE_DRIVERS_SCREEN.TITLE}
      />
      <FlatList
        data={drivers}
        renderItem={({item}) => <DriverCard job_id={job_id} driver={item} />}
        keyExtractor={item => item._id}
        ListEmptyComponent={
          <ListEmptyComponent text={language.AVAILABLE_DRIVERS_SCREEN.EMPTY} />
        }
      />
    </NonScrollableScreenContainer>
  );
};

export default AvailableDriversScreen;
