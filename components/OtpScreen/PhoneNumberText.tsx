import React from 'react';
import Typography from '../common/Typography';
import Spacer from '../common/Spacer';
import useLanguage from '../../hooks/useLanguage';

type TPhoneNumberText = {
  phoneNumber: string;
  spacerHeight: number;
};

export default function PhoneNumberText(props: TPhoneNumberText) {
  const language = useLanguage();
  return (
    <>
      <Typography>
        {language.OTP_SCREEN.A_CODE_SENT}{' '}
        <Typography fontWeight="600">{props.phoneNumber}</Typography>
      </Typography>
      <Spacer height={props.spacerHeight} />
      <Typography>{language.OTP_SCREEN.ENTER}</Typography>
    </>
  );
}
