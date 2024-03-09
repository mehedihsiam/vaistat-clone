import React from 'react';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import Typography from '../components/common/Typography';

export default function PermissionRequiredScreen() {
  return (
    <NonScrollableScreenContainer>
      <Typography>We need to access your location.</Typography>
    </NonScrollableScreenContainer>
  );
}
