import {Linking} from 'react-native';

const openLink = (url: string) => async () => {
  await Linking.openURL(url);
};

export default openLink;
