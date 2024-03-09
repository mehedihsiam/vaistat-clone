import React from 'react';
import FlexRowStart from '../common/FlexRowStart';
import Radio from '../common/RadioOptions/Radio';
import Typography from '../common/Typography';

type TCommonMethodHeading = {
  isActive: boolean;
  title: string;
};

export default function CommonMethodHeading(props: TCommonMethodHeading) {
  return (
    <FlexRowStart gap={5}>
      <Radio isSelected={props.isActive} />
      <Typography>{props.title}</Typography>
    </FlexRowStart>
  );
}
