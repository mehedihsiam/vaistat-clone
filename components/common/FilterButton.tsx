import React from 'react';
import TransparentButton from './TransparentButton';
import SVGs from '../../assets';
import useCustomTheme from '../../hooks/useCustomTheme';

type TFilterButton = {
  onPress: () => void;
};

export default function FilterButton(props: TFilterButton) {
  const theme = useCustomTheme();
  return (
    <TransparentButton onPress={props.onPress}>
      {SVGs.Funnel(24, 24, theme.ACCENT)}
    </TransparentButton>
  );
}
