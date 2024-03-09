import React, {createContext, useEffect, useState} from 'react';

import {TLocationPartial} from '../types/location';
import useUpdateCurrentLocation from '../APIs/hooks/useUpdateCurrentLocation';
import useAuth from './hooks/useAuth';

type TValues = {
  location?: TLocationPartial;
  address?: string;
};

type TDispatch = {
  updateLocation: (location: TLocationPartial, address?: string) => void;
};

export const LocationContext = createContext<TValues | undefined>(undefined);
export const LocationDispatchContext = createContext<TDispatch | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
};

export default function LocationArea(props: Props) {
  const [location, setLocation] = useState<TLocationPartial | undefined>();
  const [address, setAddress] = useState<string | undefined>();
  const updateLocation = useUpdateCurrentLocation();
  const auth = useAuth();

  const fetch = async () => {
    if (auth && location) {
      await updateLocation({...location, driver_id: auth?._id});
    }
  };

  const dispatch = {
    updateLocation: (loc: TLocationPartial, addressText?: string) => {
      setLocation(loc);
      setAddress(addressText);
    },
  };

  const values = {
    location,
    address,
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    interval = setInterval(() => {
      fetch();
    }, 600000);
    return () => clearInterval(interval);
  }, [auth?._id, location?.latitude, location?.longitude]);

  return (
    <LocationContext.Provider value={values}>
      <LocationDispatchContext.Provider value={dispatch}>
        {props.children}
      </LocationDispatchContext.Provider>
    </LocationContext.Provider>
  );
}
