import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import SVGs from '../../assets';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import useCustomTheme from '../../hooks/useCustomTheme';
import Spacer from './Spacer';
import Typography from './Typography';

export type TScreenTitle = {
  showBackButton?: boolean;
  customBackIcon?: React.ReactNode;
  backScreen?: string;
  title?: string;
  showTickMark?: boolean;
  handleTick?: () => void;
  paddingHorizontal?: number;
  rightComponent?: React.ReactNode;
};

export default function ScreenTitle(props: TScreenTitle) {
  const {navigate, goBack} = useCustomNavigate();
  const theme = useCustomTheme();

  const handleNavigate = () => {
    if (props.backScreen) {
      navigate(props.backScreen);
    } else {
      goBack();
    }
  };

  return (
    <View
      style={[
        styles.titleContainer,
        {paddingHorizontal: props.paddingHorizontal},
      ]}>
      {props.showBackButton ? (
        <TouchableOpacity
          onPress={handleNavigate}
          activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}>
          {props.customBackIcon || SVGs.ArrowLeft(32, 32, theme.DISABLED_TEXT)}
        </TouchableOpacity>
      ) : (
        <Spacer height={32} width={32} />
      )}
      <Typography fontWeight="600" textAlign="center">
        {props.title}
      </Typography>
      {props.showTickMark ? (
        <TouchableOpacity
          onPress={props.handleTick}
          activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}>
          {SVGs.Tick(20, 20)}
        </TouchableOpacity>
      ) : props.rightComponent ? (
        props.rightComponent
      ) : (
        <Spacer height={20} width={20} />
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
