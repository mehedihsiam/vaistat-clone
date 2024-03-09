import Geolocation from 'react-native-geolocation-service';
export const IosLocationPermission = async () => {
  try {
    const auth = await Geolocation.requestAuthorization('always');
    return auth;
  } catch (err) {
    console.log('ios permission error: ', err);
  }
};
