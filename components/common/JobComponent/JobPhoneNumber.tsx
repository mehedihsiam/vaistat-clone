import React from 'react';
import SVGs from '../../../assets';
import useCustomTheme from '../../../hooks/useCustomTheme';
import FlexRowStart from '../FlexRowStart';
import Typography from '../Typography';

type TJobParentLocation = {
  number: string;
  color?: string;
};

export default function JobPhoneNumber(props: TJobParentLocation) {
  const theme = useCustomTheme();
  const color = props.color ? props.color : theme.DISABLED_TEXT;
  return (
    <FlexRowStart gap={5}>
      {SVGs.Phone(16, 16, color)}
      <Typography fontSize={12} fontWeight="400" color={theme.DISABLED_TEXT}>
        {props.number}
      </Typography>
    </FlexRowStart>
  );
}
