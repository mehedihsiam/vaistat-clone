import React from 'react';
import LoggedInNavigator from '../navigators/LoggedInNavigators';
import LoggedOutNavigator from '../navigators/LoggedOutNavigator';

import useAuthToken from '../contexts/hooks/useToken';

export default function MainAppContainer() {
  const token = useAuthToken();
  return token ? <LoggedInNavigator /> : <LoggedOutNavigator />;
}
