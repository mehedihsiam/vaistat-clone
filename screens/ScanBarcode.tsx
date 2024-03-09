import React, {useState} from 'react';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import ScreenTitle from '../components/common/ScreenTitle';
import CodeScanner from '../components/common/CodeScanner';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';

export default function ScanBarcode() {
  const [codeValue, setCodeValue] = useState<string | undefined>();
  return (
    <NonScrollableScreenContainer
      paddingHorizontal={0.01}
      paddingVertical={0.01}>
      <ScreenTitle
        title="Scan Barcode"
        showBackButton
        paddingHorizontal={COMMONLY_USED_DATA.SCREEN_PADDING}
      />
      <CodeScanner codeValue={codeValue} setCodeValue={setCodeValue} />
    </NonScrollableScreenContainer>
  );
}
