import React from 'react';
import {StyleSheet, View} from 'react-native';
import useCustomTheme from '../../hooks/useCustomTheme';
import ColumnCenter from '../common/ColumnCenter';
import Typography from '../common/Typography';

type TChatHeader = {
  title: string;
};

const ChatHeader = (props: TChatHeader) => {
  const theme = useCustomTheme();
  return (
    <View style={[styles.container, {backgroundColor: theme.PRIMARY}]}>
      <ColumnCenter>
        <Typography color={theme.OPPOSITE_OF_ACCENT}>{props.title}</Typography>
      </ColumnCenter>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
  },
});
