import React, {Fragment, useState} from 'react';
import MapOverlayThreeButtons from './MapOverlayThreeButtons';
import Map from './Map';

import OnlineToggleButton from './OnlineToggleButton';
import ResetLocationButton from './ResetLocationButton';
import {TLocationPartial} from '../../types/location';

type TMapViewArea = {
  destination?: TLocationPartial;
};

export default function MapViewArea(props: TMapViewArea) {
  const [resetLocation, setResetLocation] = useState(0);

  const handleReset = () => {
    setResetLocation(prev => prev + 1);
  };

  return (
    <Fragment>
      <MapOverlayThreeButtons />
      <Map reset={resetLocation} destination={props.destination} />
      <ResetLocationButton onPress={handleReset} />
      <OnlineToggleButton />
    </Fragment>
  );
}
