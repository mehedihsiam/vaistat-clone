import {Linking} from 'react-native';

export const navigateToIosLocationSettings = () => {
  Linking.openURL('App-Prefs:Privacy-Location');
};
