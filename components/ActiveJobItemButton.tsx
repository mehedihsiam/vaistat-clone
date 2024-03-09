import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {Fragment, useState} from 'react';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';
import JobPerson from './common/JobComponent/JobPerson';
import JobLocation from './common/JobComponent/JobLocation';
import Typography from './common/Typography';
import useCustomTheme from '../hooks/useCustomTheme';
import useCustomNavigate from '../hooks/useCustomNavigate';
import {LOGGED_IN_ROUTES} from '../constants/ROUTES';
import {TJobTag} from '../types/activeJobs';
import Tag from './common/Tag';
import FlexRowBetween from './common/FlexRowBetween';
import Spacer from './common/Spacer';
import useLanguage from '../hooks/useLanguage';
import openLink from '../utils/openLink';
import FlexRowStart from './common/FlexRowStart';
import OrderNoteModal from '../containers/Modal/OrderNoteModal';
import {Swipeable} from 'react-native-gesture-handler';
import RightButton from './common/JobComponent/RightButton';
import SVGs from '../assets';

type TActiveJobItemButton = {
  customer_name?: string;
  pick_up_location: string;
  drop_off_location: string;
  customer_phone_number?: string;
  job_id: string;
  job_tags: TJobTag[];
  onPress: () => void;
  job_amount?: number | null;
  estimate_distance?: number | null;
  variant?: 'completed' | 'active';
  note?: string;
  itemBgColor: string;
  collectedAmount?: number;
};

const ActiveJobItemButton = (props: TActiveJobItemButton) => {
  const language = useLanguage();
  const theme = useCustomTheme();
  const {navigate} = useCustomNavigate();

  const [openModal, setOpenModal] = useState(false);

  const handleDeliver = () => {
    if (props.collectedAmount! > 0 || props?.job_amount! < 1) {
      navigate(LOGGED_IN_ROUTES.ORDER_DELIVERY, {
        job_id: props.job_id,
        collectedAmount: props.collectedAmount || 0,
        customer_name: props.customer_name,
      });
    } else {
      navigate(LOGGED_IN_ROUTES.PAYMENT, {
        collectableAmount: props?.job_amount || 0,
        job_id: props.job_id,
      });
    }
  };

  const handleTransfer = () => {
    navigate(LOGGED_IN_ROUTES.AVAILABLE_DRIVERS, {
      job_id: props.job_id,
    });
  };

  const handleGoReadyDeliverySCreen = () => {
    navigate(LOGGED_IN_ROUTES.READY_DELIVERY, {
      job_id: props.job_id,
      hideFooter: props.variant === 'completed',
    });
  };

  const handleNotDeliver = () => {
    navigate(LOGGED_IN_ROUTES.NOT_DELIVERED, {
      job_id: props.job_id,
    });
  };

  const handleSeeNote = () => {
    setOpenModal(!openModal);
  };

  const getCollectText = () => {
    switch (props.variant) {
      case 'active':
        return language.ACTIVE_JOBS_SCREEN.COLLECT;

      case 'completed':
        return language.ACTIVE_JOBS_SCREEN.AMOUNT_PAID;
      default:
        return language.ACTIVE_JOBS_SCREEN.COLLECT;
    }
  };

  return (
    <Fragment>
      {openModal && (
        <OrderNoteModal
          note={props.note || ''}
          open={openModal}
          setOpenModal={setOpenModal}
        />
      )}
      <Swipeable
        containerStyle={[styles.container]}
        renderLeftActions={() => {
          return props.variant === 'active' ? (
            <>
              <RightButton
                title={language.READY_DELIVERY_SCREEN.TRANSFER_JOB}
                onPress={handleTransfer}
                bgColor="#f1c232"
                height="100%"
              />
              <RightButton
                title={language.READY_DELIVERY_SCREEN.NOT_DELIVERED}
                onPress={handleNotDeliver}
                bgColor={theme.DISABLED_TEXT}
                height="100%"
              />
            </>
          ) : null;
        }}
        renderRightActions={() => {
          return props.variant === 'active' ? (
            <>
              <RightButton
                onPress={openLink(`tel:${props.customer_phone_number}`)}
                bgColor="#0866ff"
                height="100%"
                icon={SVGs.PhoneWhite(30, 30)}
              />
              <RightButton
                title={language.READY_DELIVERY_SCREEN.DELIVER}
                onPress={handleDeliver}
                bgColor={theme.PRIMARY}
                height="100%"
              />
            </>
          ) : null;
        }}>
        <View
          style={[
            styles.childrenContainer,
            {backgroundColor: props.itemBgColor},
          ]}>
          <TouchableOpacity
            activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
            onPress={handleGoReadyDeliverySCreen}>
            <FlexRowBetween alignItems="flex-start">
              <View style={styles.halfContainer}>
                {props.customer_name && (
                  <JobPerson
                    person={
                      props.customer_name.length > 20
                        ? props.customer_name.substring(0, 20) + '...'
                        : props.customer_name
                    }
                  />
                )}
              </View>

              <View style={styles.halfContainer}>
                <JobLocation
                  location={
                    props.drop_off_location.length > 25
                      ? props.drop_off_location.substring(0, 25) + '...'
                      : props.drop_off_location
                  }
                />
              </View>
            </FlexRowBetween>
            <Spacer height={10} />

            {props.note && (
              <TouchableOpacity
                onPress={handleSeeNote}
                style={styles.noteButton}
                activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
                disabled={props.note?.length! < 55}>
                <Typography fontSize={12}>
                  {props.note?.length! > 55
                    ? `${props.note?.substring(0, 55)}... See More`
                    : props.note}
                </Typography>
              </TouchableOpacity>
            )}

            <FlexRowStart flex={1} gap={3} flexWrap="wrap">
              {props.job_tags.map(tag => (
                <Tag
                  key={tag._id}
                  tag={tag.tag_for}
                  backgroundColor={tag.tag_code}
                  tagImage={{uri: tag.tag_image}}
                />
              ))}
            </FlexRowStart>

            <Spacer height={10} />

            <FlexRowBetween gap={3} alignItems="center">
              {props.estimate_distance && (
                <Typography
                  fontSize={14}
                  color={
                    theme.WARNING
                  }>{`${language.ACTIVE_JOBS_SCREEN.DISTANCE} ${props.estimate_distance} km`}</Typography>
              )}
              {props.job_amount ? (
                <Typography fontSize={14} color={theme.DANGER}>
                  {getCollectText()} ${props.job_amount.toFixed(2)}
                </Typography>
              ) : null}
            </FlexRowBetween>
          </TouchableOpacity>
        </View>
      </Swipeable>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
  childrenContainer: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  callButton: {
    paddingVertical: 4,
    width: 35,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  halfContainer: {
    width: '50%',
  },
  noteButton: {
    paddingVertical: 5,
  },
});

export default ActiveJobItemButton;
