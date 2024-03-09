import {PermissionsAndroid} from 'react-native';

export const androidLocationPermissionText = {
  title: 'Device current location permission',
  message: 'Allow app to get your current location',
  buttonNeutral: 'Ask Me Later',
  buttonNegative: 'Cancel',
  buttonPositive: 'OK',
};

export const AndroidLocationPermissions = async () => {
  try {
    const permission_ = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      androidLocationPermissionText
    );
    return permission_;
  } catch (err) {
    console.log('androidLocationPermission error: ', err);
  }
};
