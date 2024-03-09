import React from 'react';
import SVGs from '../../../assets';
import useCustomTheme from '../../../hooks/useCustomTheme';
import FlexRowStart from '../FlexRowStart';
import Typography from '../Typography';

type TJobParentLocation = {
  person: string;
};

export default function JobPerson(props: TJobParentLocation) {
  const theme = useCustomTheme();
  return (
    <FlexRowStart gap={5}>
      {SVGs.ProfileFill(16, 16, theme.PRIMARY)}
      <Typography fontSize={12} fontWeight="400">
        {props.person}
      </Typography>
    </FlexRowStart>
  );
}
