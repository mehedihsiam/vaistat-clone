import {View, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';
import useActiveJobContext from '../../contexts/hooks/useActiveJobContext';
import FlexRowBetween from '../common/FlexRowBetween';
import Typography from '../common/Typography';
import Tag from '../common/Tag';
import useLanguage from '../../hooks/useLanguage';
import NoTaskField from '../NoTaskField';
import DrawerLocationCard from './DrawerLocationCard';
import Spacer from '../common/Spacer';
import ReadyForDeliveryScreenFooter from '../ReadyForDeliveryScreenFooter';

type TActiveJobDrawer = {
  isOpen: boolean;
  handleClose: () => void;
  job_id?: string;
};

const ActiveJobDrawer = (props: TActiveJobDrawer) => {
  const theme = useCustomTheme();
  const language = useLanguage();
  const activeJobContext = useActiveJobContext();

  const job = activeJobContext?.jobList.filter(
    item => item._id === props.job_id
  )[0];

  return (
    <Modal
      style={styles.modal}
      visible={props.isOpen}
      transparent
      animationType="slide">
      <TouchableOpacity
        style={[styles.closingArea, {backgroundColor: theme.DISABLED_TEXT}]}
        onPress={props.handleClose}
      />
      <View style={styles.container}>
        {job ? (
          <>
            <FlexRowBetween>
              <Typography
                color={
                  theme.WARNING
                }>{`${language.ACTIVE_JOBS_SCREEN.DISTANCE} ${job?.estimate_distance} km`}</Typography>
              <Tag
                tag={`${
                  language.ACTIVE_JOBS_SCREEN.COLLECT
                } $${job?.job_amount.toFixed(2)}`}
                backgroundColor={theme.PRIMARY}
                color={theme.OPPOSITE_OF_ACCENT}
              />
            </FlexRowBetween>
            <DrawerLocationCard location={job?.drop_off_location} />
            <Spacer height={20} />
            <ReadyForDeliveryScreenFooter
              showCallButton
              onPressExtra={props.handleClose}
              zeroPadding
              job={job}
            />
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <NoTaskField text={language.READY_DELIVERY_SCREEN.NOT_FOUND} />
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'relative',
    justifyContent: 'center',
  },
  closingArea: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
  },
  container: {
    width: '100%',
    height: '50%',
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    bottom: 0,
    padding: 20,
  },
  emptyContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ActiveJobDrawer;
