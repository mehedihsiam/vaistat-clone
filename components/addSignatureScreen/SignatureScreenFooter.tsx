import React from 'react';
import FlexRowBetween from '../common/FlexRowBetween';
import useCustomTheme from '../../hooks/useCustomTheme';
import OutlineButton from '../common/OutlineButton';
import Typography from '../common/Typography';
import Button from '../Button';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';

type TSignatureScreenFooter = {
  onClear: () => void;
  onSave: () => void;
};

export default function SignatureScreenFooter(props: TSignatureScreenFooter) {
  const theme = useCustomTheme();
  return (
    <FlexRowBetween
      gap={10}
      paddingHorizontal={COMMONLY_USED_DATA.SCREEN_PADDING}
      paddingVertical={10}>
      <OutlineButton onPress={props.onClear}>
        <Typography>Clear</Typography>
      </OutlineButton>
      <Button
        variant="fillRounded"
        title="Save"
        backgroundColor={theme.PRIMARY}
        textColor={theme.OPPOSITE_OF_ACCENT}
        width="auto"
        flex={1}
        onPress={props.onSave}
      />
    </FlexRowBetween>
  );
}
