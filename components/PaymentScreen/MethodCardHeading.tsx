import React, {Fragment} from 'react';
import FlexRowBetween from '../common/FlexRowBetween';
import FlexRowStart from '../common/FlexRowStart';
import Radio from '../common/RadioOptions/Radio';
import Typography from '../common/Typography';
import FlexRowEnd from '../common/FlexRowEnd';
import PAYMENT_CARDS from '../../constants/PAYMENTSCARDS';

type TMethodCardHeading = {
  isActive: boolean;
};

export default function MethodCardHeading(props: TMethodCardHeading) {
  return (
    <FlexRowBetween alignItems="center">
      <FlexRowStart gap={5}>
        <Radio isSelected={props.isActive} />
        <Typography>Credit Card</Typography>
      </FlexRowStart>
      <FlexRowEnd gap={5}>
        {PAYMENT_CARDS.map((card, index) => (
          <Fragment key={index}>{card}</Fragment>
        ))}
      </FlexRowEnd>
    </FlexRowBetween>
  );
}
