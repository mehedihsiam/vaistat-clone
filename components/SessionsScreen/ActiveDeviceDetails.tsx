import React from 'react';
import {StyleSheet, View} from 'react-native';
import SVGs from '../../assets';
import useCustomTheme from '../../hooks/useCustomTheme';
import Typography from '../common/Typography';
type TDeviceDetails = {
  deviceName: string;
  IMEINumber: string;
  status?: string;
  isAuthenticate?: boolean;
};
const ActiveDeviceDetails = (props: TDeviceDetails) => {
  const theme = useCustomTheme();
  return (
    <View style={styles.deviceContainer}>
      <Typography fontWeight="600" textAlign="center">
        {props.deviceName}
      </Typography>
      <Typography textAlign="center">
        You are currently using the device with IMEI:
      </Typography>
      <Typography textAlign="center">XXXXXXXXXXXXXXXXXX</Typography>
      <View
        style={[
          styles.statusBtn,
          {
            backgroundColor: props.isAuthenticate
              ? theme.PRIMARY_LIGHT
              : theme.DANGER_LIGHT,
          },
        ]}>
        {SVGs.CheckRound(19, 19)}
        <Typography fontWeight="600" textAlign="center">
          Status: {props.isAuthenticate ? 'Token Authenticated' : 'Revoked'}
        </Typography>
      </View>
    </View>
  );
};

export default ActiveDeviceDetails;

const styles = StyleSheet.create({
  deviceContainer: {
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 15,
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    marginVertical: 10,
  },
  statusBtn: {
    paddingVertical: 8,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderRadius: 8,
  },
});
