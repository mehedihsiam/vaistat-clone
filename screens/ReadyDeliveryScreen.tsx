import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import SVGs from '../assets';
import Button from '../components/Button';
import ReadyForDeliveryScreenFooter from '../components/ReadyForDeliveryScreenFooter';
import DetailsBoxWrapper from '../components/common/DetailsBoxWrapper';
import JobParentTopLine from '../components/common/JobComponent/JobParentTopLine';
import JobDetailsCard from '../components/common/JobDetailsCard';
import ScreenTitle from '../components/common/ScreenTitle';
import Spacer from '../components/common/Spacer';
import Typography from '../components/common/Typography';
import {LOGGED_IN_ROUTES} from '../constants/ROUTES';
import CommonScreenContainer from '../containers/CommonScreenContainer';
import DirectionModal from '../containers/Modal/DirectionModal';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import useCustomNavigate from '../hooks/useCustomNavigate';
import useCustomTheme from '../hooks/useCustomTheme';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInStackParamList} from '../types/stacksParamsList';
import useGetSingleJob from '../APIs/hooks/useGetSingleJob';
import {TActiveJob} from '../types/activeJobs';
import useDispatchAppLocalData from '../contexts/hooks/useDispatchAppLocalData';
import useSnackBarSetContext from '../contexts/hooks/useSnackBarLoadingContext';
import NoTaskField from '../components/NoTaskField';
import openLink from '../utils/openLink';
import useLocalAppData from '../contexts/hooks/useLocalAppData';
import useLanguage from '../hooks/useLanguage';

type Props = NativeStackScreenProps<LoggedInStackParamList, 'ReadyDelivery'>;

type TLocationOptionType = 'pickup' | 'drop_off';

export default function ReadyDeliveryScreen(props: Props) {
  const language = useLanguage();
  const {job_id, hideFooter} = props.route.params;
  const theme = useCustomTheme();
  const {navigate} = useCustomNavigate();
  const getSingleJob = useGetSingleJob();
  const dispatchAppLocal = useDispatchAppLocalData();
  const appLocalData = useLocalAppData();
  const snackbar = useSnackBarSetContext();

  const [openDirectionModal, setDirectionModal] = useState<boolean>(false);
  const [job, setJob] = useState<TActiveJob | undefined>(undefined);
  const [refreshing, setRefreshing] = useState(false);

  const isCollected = job?.collected_amount! > 0;

  const [locationToSee, setLocationToSee] = useState<
    TLocationOptionType | undefined
  >(undefined);

  const locations = {
    pickup: {
      latitude: job?.pickup_lat_long[0],
      longitude: job?.pickup_lat_long[1],
    },
    drop_off: {
      latitude: job?.dropoff_lat_long[0],
      longitude: job?.dropoff_lat_long[1],
    },
  };

  const fetchJob = async () => {
    const isStopped = props.route.params.stopLoading;
    dispatchAppLocal?.setIsLoading(isStopped ? false : true);
    setRefreshing(true);
    const res = await getSingleJob({job_id});
    if (res.code === 200) {
      dispatchAppLocal?.setIsLoading(false);
      setJob(res.result);
    } else {
      snackbar?.showSnackBar(res.message, 'error');
      dispatchAppLocal?.setIsLoading(false);
    }
    setRefreshing(false);
  };

  const handleOpenMap = async () => {
    if (job?.dropoff_lat_long && job.pickup_lat_long) {
      const lat = locationToSee ? locations[locationToSee].latitude : 0;
      const lng = locationToSee ? locations[locationToSee].longitude : 0;

      const mapUri = Platform.select({
        ios: `https://maps.apple.com/?daddr=${lat},${lng}`,
        android: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      });
      await openLink(mapUri || '')();
    }
  };

  const handlePressThisApp = () => {
    navigate(LOGGED_IN_ROUTES.HOME, {
      destination: locations[locationToSee || 'drop_off'],
    });
  };

  const handlePressLocation = (option: TLocationOptionType) => () => {
    setLocationToSee(option);
    setDirectionModal(true);
  };

  useEffect(() => {
    fetchJob();
  }, [job_id, props.route.params.stopLoading]);

  return (
    <React.Fragment>
      {openDirectionModal && (
        <DirectionModal
          onOpenMap={handleOpenMap}
          open={openDirectionModal}
          setOpen={setDirectionModal}
          onPressThisApp={handlePressThisApp}
        />
      )}

      <NonScrollableScreenContainer
        paddingHorizontal={0.001}
        paddingVertical={0.001}>
        <ScreenTitle
          showBackButton
          title={hideFooter ? '' : language.READY_DELIVERY_SCREEN.TITLE}
          paddingHorizontal={COMMONLY_USED_DATA.SCREEN_PADDING}
        />
        {job ? (
          <React.Fragment>
            <CommonScreenContainer refreshing={refreshing} onRefresh={fetchJob}>
              <View style={styles.container}>
                <JobParentTopLine
                  hideDownArrow
                  logo={{uri: job.user_id.profile_img}}
                  isOpen={true}
                  name={job.user_id.pharmacy_name}
                />

                <Spacer height={20} />
                <JobDetailsCard
                  contactNumber={`${job.user_id.country_code} ${job.user_id.mobile_no}`}
                  location={job.pick_up_location}
                  date={`${job.jobTimingObj.startTime.hour}:${job.jobTimingObj.startTime.minute}`}
                  onPressLocation={handlePressLocation('pickup')}
                  hideLocationButton={hideFooter}
                />
                <Spacer height={20} />
                <View style={styles.itemsCenter}>
                  {SVGs.ScrollArrow(26, 26)}
                </View>
              </View>
              <Spacer height={20} />
              <JobDetailsCard
                contactNumber={
                  hideFooter
                    ? undefined
                    : `${job.customer_country_code} ${job.customer_phone}`
                }
                location={job.drop_off_location}
                date={`${job.jobTimingObj.endTime.hour}:${job.jobTimingObj.endTime.minute}`}
                onPressLocation={handlePressLocation('drop_off')}
                hideLocationButton={hideFooter}
              />

              <DetailsBoxWrapper>
                {!isCollected && !hideFooter && (
                  <Typography textAlign="center">
                    {language.READY_DELIVERY_SCREEN.ASK_FOR_PAYMENT}
                  </Typography>
                )}

                <Spacer height={10} />
                <Button
                  backgroundColor={theme.PRIMARY}
                  variant="fillRounded"
                  textColor={theme.OPPOSITE_OF_ACCENT}
                  title={
                    isCollected || hideFooter
                      ? `${
                          language.READY_DELIVERY_SCREEN.COLLECTED
                        } $${job.collected_amount.toFixed(2)} ${
                          language.READY_DELIVERY_SCREEN.PAYMENT
                        }`
                      : `${
                          language.READY_DELIVERY_SCREEN.RECEIVE
                        } $${job.job_amount.toFixed(2)} ${
                          language.READY_DELIVERY_SCREEN.PAYMENT
                        }`
                  }
                  disabledBgColor={theme.PRIMARY}
                  disabledTextColor={theme.OPPOSITE_OF_ACCENT}
                  disabled
                />
              </DetailsBoxWrapper>
            </CommonScreenContainer>
            {!hideFooter && <ReadyForDeliveryScreenFooter job={job} />}
          </React.Fragment>
        ) : (
          <NoTaskField
            text={
              appLocalData.loading
                ? language.READY_DELIVERY_SCREEN.SEARCHING
                : language.READY_DELIVERY_SCREEN.NOT_FOUND
            }
          />
        )}
      </NonScrollableScreenContainer>
    </React.Fragment>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemsCenter: {
    alignItems: 'center',
  },
});
