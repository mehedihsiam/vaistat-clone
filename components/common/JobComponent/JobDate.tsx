import React from 'react';
import SVGs from '../../../assets';
import useCustomTheme from '../../../hooks/useCustomTheme';
import FlexRowStart from '../FlexRowStart';
import Typography from '../Typography';

type TJobDate = {
  date: string;
  color?: string;
};

export default function JobDate(props: TJobDate) {
  const theme = useCustomTheme();
  const color = props.color ? props.color : theme.DISABLED_TEXT;
  return (
    <FlexRowStart gap={5}>
      {SVGs.Clock(16, 16, color)}
      <Typography fontSize={12} fontWeight="600" color={theme.DISABLED_TEXT}>
        {props.date}
      </Typography>
    </FlexRowStart>
  );
}
