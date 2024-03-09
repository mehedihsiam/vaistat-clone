import {TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';
import Spacer from '../common/Spacer';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import Typography from '../common/Typography';
import SVGs from '../../assets';
import DocUploadModal from './DocUploadModal';

import SuccessTick from '../common/SuccessTick';
import {TSetState} from '../../types/setStateType';
import accountVerificationInitialData from '../../data/AccountVerificationInitialData';

type TDocUploadButton = {
  onPress?: () => void;
  title: string;
  accountVerificationInitialDataObjectKey: keyof typeof accountVerificationInitialData;
  setCount: TSetState<number>;
};

export default function DocUploadButton(props: TDocUploadButton) {
  const theme = useCustomTheme();
  const key = props.accountVerificationInitialDataObjectKey;
  const [modalVisible, setModalVisible] = React.useState(false);

  const thisData = accountVerificationInitialData[key];

  const handlePress = () => {
    setModalVisible(true);
  };

  return (
    <>
      {modalVisible && (
        <DocUploadModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          docObject={thisData}
          setCount={props.setCount}
        />
      )}
      <Spacer height={20} />
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
        style={[styles.container, {borderColor: theme.DISABLED_TEXT}]}>
        {thisData.image ? (
          <SuccessTick size={20} />
        ) : (
          SVGs.Camera(24, 24, theme.ACCENT)
        )}
        <Typography fontWeight="500" flex={1}>
          {props.title}
        </Typography>
        {SVGs.CaretRight(24, 24, theme.ACCENT)}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    height: 48,
    borderRadius: 16,
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
});
