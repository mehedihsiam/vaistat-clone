import React from 'react';
import LinkText from '../common/LinkText';
import Typography from '../common/Typography';
import useCustomTheme from '../../hooks/useCustomTheme';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import {ROOT_ROUTES} from '../../constants/ROUTES';
import useLanguage from '../../hooks/useLanguage';

export default function TermsAndConditionWarning() {
  const theme = useCustomTheme();
  const {navigate} = useCustomNavigate();
  const language = useLanguage();

  const handleNavigate = () => {
    navigate(ROOT_ROUTES.TERMS_AND_CONDITIONS);
  };

  return (
    <LinkText
      color={theme.ACCENT}
      fontSize={12}
      fontWeight="400"
      textAlign="center"
      onPress={handleNavigate}>
      {language.LOGIN_SCREEN.TERMS_WARNING.PART_1}{' '}
      <Typography fontSize={14} color={theme.PRIMARY}>
        {language.LOGIN_SCREEN.TERMS_WARNING.PART_2}
      </Typography>
      &nbsp;{language.LOGIN_SCREEN.TERMS_WARNING.PART_3}
    </LinkText>
  );
}
