import React from 'react';
import HomeScreenHeader from './HomeScreenHeader';
import HomeContextHeader from './HomeContextHeader';
import {THomeHeader} from '../../types/homeHeaderTitle';

type THomeHeaderProps = THomeHeader & {
  variant: 'Home' | 'Others';
};

const HomeHeader = (props: THomeHeaderProps) => {
  switch (props.variant) {
    case 'Home':
      return <HomeScreenHeader {...props} />;

    case 'Others':
      return <HomeContextHeader {...props} />;
    default:
      return <HomeContextHeader {...props} />;
  }
};

export default HomeHeader;
