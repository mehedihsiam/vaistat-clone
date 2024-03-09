import React from 'react';
import CommonScreenContainer from '../containers/CommonScreenContainer';
import ScreenTopLogo from '../components/common/ScreenTopLogo';
import FaqAccordion from '../components/FaqScreen/FaqAccordion';
import FAQ_DATA from '../data/FAQ_DATA';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';

export default function FaqScreen() {
  return (
    <CommonScreenContainer
      screenTitleProps={{
        title: 'FAQ',
        showBackButton: true,
        paddingHorizontal: COMMONLY_USED_DATA.SCREEN_PADDING,
      }}>
      <ScreenTopLogo paddingVertical={30} />
      {FAQ_DATA.map(item => (
        <FaqAccordion item={item} key={item.label} />
      ))}
    </CommonScreenContainer>
  );
}
