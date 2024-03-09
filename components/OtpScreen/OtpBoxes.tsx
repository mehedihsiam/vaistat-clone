import {View, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';
import Typography from '../common/Typography';
import {TSetState} from '../../types/setStateType';

type TOtpBoxes = {
  otp: string;
  setOtp: TSetState<string>;
};

export default function OtpBoxes(props: TOtpBoxes) {
  const theme = useCustomTheme();

  const isFulfilled = props.otp.length > 3;

  const changeText = (text: string) => {
    props.setOtp(text);
  };

  return (
    <>
      <View style={styles.container}>
        {new Array(4).fill(0).map((_, index) => (
          <View
            key={index}
            style={[
              styles.otpBox,
              {
                backgroundColor: isFulfilled
                  ? theme.PRIMARY
                  : theme.DISABLED_BG,
              },
            ]}>
            <Typography
              color={isFulfilled ? theme.OPPOSITE_OF_ACCENT : theme.ACCENT}>
              {props.otp.split('')[index]}
            </Typography>
          </View>
        ))}
        <TextInput
          value={props.otp}
          maxLength={4}
          onChangeText={changeText}
          style={styles.input}
          caretHidden={true}
          keyboardType="number-pad"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    width: 244,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  otpBox: {
    height: 56,
    width: 56,
    backgroundColor: 'blue',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
  input: {width: '100%', position: 'absolute', opacity: 0},
});
