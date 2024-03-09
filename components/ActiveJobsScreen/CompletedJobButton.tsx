import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BottomLoadingIndicator from './BottomLoadingIndicator';
import Spacer from '../common/Spacer';
import Typography from '../common/Typography';
import useCustomTheme from '../../hooks/useCustomTheme';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import useLanguage from '../../hooks/useLanguage';

type TCompletedJobButton = {
  onPress?: () => void;
  loading?: boolean;
};

const CompletedJobButton = (props: TCompletedJobButton) => {
  const theme = useCustomTheme();
  const language = useLanguage();

  return (
    <View
      style={[styles.loadingContainer, {backgroundColor: theme.DISABLED_BG}]}>
      {props.loading ? <BottomLoadingIndicator /> : <Spacer height={3} />}
      <TouchableOpacity
        style={styles.button}
        activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
        onPress={props.onPress}>
        <Typography textAlign="center" color={theme.PRIMARY}>
          {language.ACTIVE_JOBS_SCREEN.COMPLETED_JOBS}
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 1,
  },
  button: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
});

export default CompletedJobButton;
