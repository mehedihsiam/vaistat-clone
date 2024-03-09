import React from 'react';
import FlexRowStart from '../FlexRowStart';
import SVGs from '../../../assets';
import Typography from '../Typography';
import useCustomTheme from '../../../hooks/useCustomTheme';

type TJobParentLocation = {
  location: string;
};

export default function JobLocation(props: TJobParentLocation) {
  const theme = useCustomTheme();
  return (
    <FlexRowStart flex={1} gap={5}>
      {SVGs.Location(16, 16, theme.PRIMARY)}
      <Typography fontSize={12} fontWeight="600" flex={1}>
        {props.location}
      </Typography>
    </FlexRowStart>
  );
}
