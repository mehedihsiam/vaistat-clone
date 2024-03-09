import React from 'react';
import {StyleSheet, View} from 'react-native';
import SVGs from '../../assets';
import Divider from '../common/Devider';
import Typography from '../common/Typography';
type TSessionItem = {
  loginData: string;
  logOutData: string;
};
const SessionItem = (props: TSessionItem) => {
  return (
    <View style={styles.sessionContainer}>
      <View style={{marginTop: 22}}>{SVGs.Mobile(28, 18)}</View>
      <View>
        <View style={styles.detailsItem}>
          <Typography>Login</Typography>
          <Typography opacity={0.5}>{props.loginData}</Typography>
        </View>
        <Divider />
        <View style={styles.detailsItem}>
          <Typography>Logout</Typography>
          <Typography opacity={0.5}>{props.logOutData}</Typography>
        </View>
      </View>
    </View>
  );
};

export default SessionItem;

const styles = StyleSheet.create({
  sessionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 15,
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    marginVertical: 10,
  },
  detailsItem: {
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
});
