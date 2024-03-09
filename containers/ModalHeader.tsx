import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import SVGs from '../assets';
import Spacer from '../components/common/Spacer';
import Typography from '../components/common/Typography';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';
import useCustomTheme from '../hooks/useCustomTheme';
import {TSetState} from '../types/setStateType';

export type TScreenTitle = {
  showCrossButton?: boolean;
  backScreen?: string;
  title?: string;
  paddingHorizontal?: number;
  setOpen: TSetState<boolean>;
};

export default function ModalHeader(props: TScreenTitle) {
  const theme = useCustomTheme();

  const handleNavigate = () => {
    props.setOpen(false);
  };

  return (
    <View
      style={[
        styles.titleContainer,
        {paddingHorizontal: props.paddingHorizontal},
      ]}>
      <Spacer height={32} width={32} />
      <Typography fontWeight="600" textAlign="center">
        {props.title}
      </Typography>
      {props.showCrossButton ? (
        <TouchableOpacity
          onPress={handleNavigate}
          activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}>
          {SVGs.Close(32, 32, theme.DISABLED_TEXT)}
        </TouchableOpacity>
      ) : (
        <Spacer height={32} width={32} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
  },
  backButton: {},
});
