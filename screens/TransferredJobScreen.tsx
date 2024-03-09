import React from 'react';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import ScreenTitle from '../components/common/ScreenTitle';
import Typography from '../components/common/Typography';

const TransferredJobScreen = () => {
  return (
    <NonScrollableScreenContainer paddingVertical={0.001}>
      <ScreenTitle title="Transferred Job" showBackButton />
      <Typography>We need to access your location.</Typography>
    </NonScrollableScreenContainer>
  );
};

export default TransferredJobScreen;
