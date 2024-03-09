import React from 'react';
import FlexRowBetween from './FlexRowBetween';
import Button from '../Button';
import useCustomTheme from '../../hooks/useCustomTheme';
import useLanguage from '../../hooks/useLanguage';

type TConfirmCancelButtonComb = {
  onCancel: () => void;
  onSubmit: () => void;
  disabledConfirm?: boolean;
  cancelButtonText?: string;
  submitButtonText?: string;
};

export default function ConfirmCancelButtonComb(
  props: TConfirmCancelButtonComb
) {
  const language = useLanguage();
  const theme = useCustomTheme();
  return (
    <FlexRowBetween gap={10}>
      <Button
        onPress={props.onCancel}
        title={props.cancelButtonText || language.COMMON_TEXTS.CANCEL}
        variant="fillRounded"
        backgroundColor={theme.DISABLED_BG}
        textColor={theme.ACCENT}
        flex={1}
      />
      <Button
        onPress={props.onSubmit}
        title={props.submitButtonText || language.COMMON_TEXTS.SUBMIT}
        variant="fillRounded"
        backgroundColor={theme.PRIMARY}
        textColor={theme.OPPOSITE_OF_ACCENT}
        flex={1}
        disabled={props.disabledConfirm}
      />
    </FlexRowBetween>
  );
}
