import React, {Fragment, useState} from 'react';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';
import useCustomTheme from '../hooks/useCustomTheme';
import Button from './Button';
import FlexRowBetween from './common/FlexRowBetween';
import OutlineButton from './common/OutlineButton';
import Typography from './common/Typography';
import useLanguage from '../hooks/useLanguage';
import {LOGGED_IN_ROUTES} from '../constants/ROUTES';
import useCustomNavigate from '../hooks/useCustomNavigate';
import JobCancelModal from '../containers/Modal/JobCancelModal';
import {TActiveJob} from '../types/activeJobs';
import openLink from '../utils/openLink';

type TReadyForDeliveryScreenFooter = {
  zeroPadding?: boolean;
  job: TActiveJob | undefined;
  onPressExtra?: () => void;
  showCallButton?: boolean;
};

export default function ReadyForDeliveryScreenFooter(
  props: TReadyForDeliveryScreenFooter
) {
  const language = useLanguage();
  const theme = useCustomTheme();
  const {navigate} = useCustomNavigate();

  const [openModal, setOpenModal] = useState(false);

  const job = props.job;

  const handleCancel = () => {
    if (props.onPressExtra) {
      props.onPressExtra();
      navigate(LOGGED_IN_ROUTES.READY_DELIVERY, {
        job_id: job?._id,
      });
    } else {
      setOpenModal(true);
    }
  };

  const handleDeliver = () => {
    if (props.onPressExtra) {
      props.onPressExtra();
    }
    if (job?.collected_amount! > 0 || job?.job_amount! < 1) {
      navigate(LOGGED_IN_ROUTES.ORDER_DELIVERY, {
        job_id: job?._id,
        collectedAmount: job?.collected_amount || 0,
        customer_name: job?.customer_name,
      });
    } else {
      navigate(LOGGED_IN_ROUTES.PAYMENT, {
        collectableAmount: job?.job_amount || 0,
        job_id: job?._id,
      });
    }
  };

  const handleNotDeliver = () => {
    if (props.onPressExtra) {
      props.onPressExtra();
    }
    navigate(LOGGED_IN_ROUTES.NOT_DELIVERED, {
      job_id: job?._id,
    });
  };

  const handleTransferJob = () => {
    if (props.onPressExtra) {
      props.onPressExtra();
    }
    navigate(LOGGED_IN_ROUTES.AVAILABLE_DRIVERS, {
      job_id: job?._id,
    });
  };

  return (
    <Fragment>
      {openModal && (
        <JobCancelModal
          job_id={job?._id}
          open={openModal}
          setOpen={setOpenModal}
        />
      )}
      <FlexRowBetween
        gap={10}
        flexWrap="wrap"
        paddingHorizontal={
          !props.zeroPadding ? COMMONLY_USED_DATA.SCREEN_PADDING : undefined
        }
        paddingVertical={10}>
        <FlexRowBetween gap={10}>
          <Button
            variant="fillRounded"
            title={language.READY_DELIVERY_SCREEN.DELIVER}
            backgroundColor={theme.PRIMARY}
            textColor={theme.OPPOSITE_OF_ACCENT}
            width="auto"
            flex={1}
            onPress={handleDeliver}
          />
          <OutlineButton onPress={handleNotDeliver}>
            <Typography color={theme.ACCENT}>
              {language.READY_DELIVERY_SCREEN.NOT_DELIVERED}
            </Typography>
          </OutlineButton>
        </FlexRowBetween>
        <FlexRowBetween gap={10}>
          <OutlineButton
            onPress={handleTransferJob}
            borderColor={theme.WARNING}>
            <Typography color={theme.WARNING}>
              {language.READY_DELIVERY_SCREEN.TRANSFER_JOB}
            </Typography>
          </OutlineButton>
          <OutlineButton onPress={handleCancel} borderColor={theme.DANGER}>
            <Typography color={theme.DANGER}>
              {language.READY_DELIVERY_SCREEN.CANCEL}
            </Typography>
          </OutlineButton>
        </FlexRowBetween>
        {props.showCallButton && (
          <OutlineButton
            onPress={openLink(
              `tel:${job?.customer_country_code}${job?.customer_phone}`
            )}
            borderColor={theme.PRIMARY}>
            <Typography color={theme.PRIMARY}>
              {language.READY_DELIVERY_SCREEN.CALL_CUSTOMER}
            </Typography>
          </OutlineButton>
        )}
      </FlexRowBetween>
    </Fragment>
  );
}
