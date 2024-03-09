import {StyleSheet, View} from 'react-native';
import React from 'react';
import SingleLine from '../common/SingleLine';
import Typography from '../common/Typography';

type TLoginRegisterLineBreaker = {
  variant: 'login' | 'register';
};

export default function LoginRegisterLineBreaker(
  props: TLoginRegisterLineBreaker
) {
  return (
    <View style={styles.container}>
      <SingleLine width="30%" />
      <Typography>
        {props.variant === 'login' ? 'or Login with' : 'or Sign up with'}
      </Typography>
      <SingleLine width="30%" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
