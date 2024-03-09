import React from 'react';
import {StyleSheet, View} from 'react-native';
import useCustomTheme from '../hooks/useCustomTheme';
import Typography from './common/Typography';
type TNoTaskField = {
  text: string;
};

const NoTaskField = (props: TNoTaskField) => {
  const theme = useCustomTheme();
  return (
    <View style={styles.noTaskField}>
      <Typography textAlign="center" color={theme.DISABLED_TEXT}>
        {props.text}
      </Typography>
    </View>
  );
};

export default NoTaskField;

const styles = StyleSheet.create({
  noTaskField: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 40,
  },
});
