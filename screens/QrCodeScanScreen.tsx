import React, {useEffect, useState} from 'react';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import ScreenTitle from '../components/common/ScreenTitle';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';
import CodeScanner from '../components/common/CodeScanner';
import useCustomNavigate from '../hooks/useCustomNavigate';
import {LOGGED_IN_ROUTES} from '../constants/ROUTES';
import useLanguage from '../hooks/useLanguage';

export default function QrCodeScanScreen() {
  const [codeValue, setCodeValue] = useState<string | undefined>();
  const language = useLanguage();

  const {navigate} = useCustomNavigate();

  const handleNavigate = async () => {
    if (codeValue) {
      navigate(LOGGED_IN_ROUTES.HOME_STACK, {
        screen: LOGGED_IN_ROUTES.TAKE_OWNERSHIP_BY_QR_CODE,
        params: {
          job_id: codeValue,
        },
      });
    }
  };

  useEffect(() => {
    handleNavigate();
  }, [codeValue]);

  return (
    <NonScrollableScreenContainer
      paddingHorizontal={0.01}
      paddingVertical={0.01}>
      <ScreenTitle
        title={language.QR_SCAN_SCREEN.TITLE}
        showBackButton
        paddingHorizontal={COMMONLY_USED_DATA.SCREEN_PADDING}
      />

      <CodeScanner codeValue={codeValue} setCodeValue={setCodeValue} />
    </NonScrollableScreenContainer>
  );
}
