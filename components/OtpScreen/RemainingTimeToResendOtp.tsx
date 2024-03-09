import React from 'react';
import Typography from '../common/Typography';
import useCustomTheme from '../../hooks/useCustomTheme';
import LinkText from '../common/LinkText';
import {TSetState} from '../../types/setStateType';
import useLanguage from '../../hooks/useLanguage';

type TRemainingTimeToResendOtp = {
  handleResendOtp: () => void;
  remainingTime: number;
  setRemainingTime: TSetState<number>;
};

export default function RemainingTimeToResendOtp(
  props: TRemainingTimeToResendOtp
) {
  const language = useLanguage();
  const theme = useCustomTheme();

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (props.remainingTime > 0) {
      interval = setInterval(() => {
        props.setRemainingTime((prev: number) => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [props]);

  return (
    <>
      {props.remainingTime > 0 ? (
        <Typography color={theme.PRIMARY}>00:{props.remainingTime}</Typography>
      ) : (
        <LinkText fontWeight="500" onPress={props.handleResendOtp}>
          {language.OTP_SCREEN.RESEND_OTP}
        </LinkText>
      )}
    </>
  );
}
