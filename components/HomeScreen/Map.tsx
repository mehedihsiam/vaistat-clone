import React, {Fragment, useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker, AnimatedRegion, MapMarker} from 'react-native-maps';
import MapCar from '../../assets/icons/custom-map-pin.png';
import useHomeScreenContext from '../../contexts/hooks/useHomeScreenContext';
import useCustomTheme from '../../hooks/useCustomTheme';
import MapViewDirections from 'react-native-maps-directions';
import {TLocation, TLocationPartial} from '../../types/location';
import Geolocation from 'react-native-geolocation-service';
import useDispatchLocationContext from '../../contexts/hooks/useDispatchLocationContext';
import useSnackBarSetContext from '../../contexts/hooks/useSnackBarLoadingContext';
import useActiveJobContext from '../../contexts/hooks/useActiveJobContext';
import SVGs from '../../assets';
import useUpcomingJobContext from '../../contexts/hooks/useAcceptedJobContext';
import useHomeScreenContextDispatch from '../../contexts/hooks/useHomeScreenContextDispatch';
import Geocoder from 'react-native-geocoding';
import Typography from '../common/Typography';
import CustomMarker from './CustomMarker';

type TRegion = TLocation & {
  latitudeDelta: number;
  longitudeDelta: number;
};

type TMap = {
  reset: number;
  destination?: TLocationPartial;
};

type TUpdateRegionParams = {
  regionData: TLocation;
  updated?: boolean;
  reset?: boolean;
};

const delta = 0.002;

const initialRegion: TRegion = {
  latitude: 23.777176,
  longitude: 90.399452,
  latitudeDelta: delta,
  longitudeDelta: delta,
  heading: 0,
};

function Map(props: TMap) {
  const theme = useCustomTheme();
  const activeJobsContext = useActiveJobContext();
  const acceptedJobsContext = useUpcomingJobContext();
  const snackBarContext = useSnackBarSetContext();
  const KEY = 'AIzaSyCG1Ht6u58AMimUlPXld5Rsw2uVjLIo7vc';
  const homeContext = useHomeScreenContext();
  const homeContextDispatch = useHomeScreenContextDispatch();
  const dispatchLocation = useDispatchLocationContext();
  const mapRef = useRef<MapView | null>(null);
  const markerRef = useRef<MapMarker | null>(null);
  const [region, setRegion] = useState<TRegion>(initialRegion);
  const [updatedView, setUpdatedView] = useState(false);
  const [animatedRegion, setAnimatedRegion] = useState<AnimatedRegion>();
  const [address, setAddress] = useState<string>('');

  const [currentLocation, setCurrentLocation] = useState<TLocation | null>(
    null
  );

  const sortedJobs = activeJobsContext?.jobList.sort(
    (a, b) => a.estimate_distance - b.estimate_distance
  );

  const handleOpenJobDrawer = (job_id: string) => () => {
    homeContextDispatch?.setOpenJobDrawer(true, job_id);
  };

  const updateRegion = ({regionData, updated, reset}: TUpdateRegionParams) => {
    const {latitude, longitude, heading} = regionData;
    const regionToSet = {
      latitude,
      longitude,
      latitudeDelta: delta,
      longitudeDelta: delta,
      heading,
    };
    dispatchLocation?.updateLocation(
      {
        latitude,
        longitude,
      },
      address
    );

    const regionAnimatedData = new AnimatedRegion(regionToSet);
    setUpdatedView(updated || false);
    setAnimatedRegion(regionAnimatedData);
    if (!updatedView || reset) {
      setRegion(regionToSet);
      mapRef.current?.animateToRegion(regionToSet);
    }
  };

  const calculateHeading = () => {
    if (props.destination && currentLocation) {
      const {latitude: lat1, longitude: lng1} = currentLocation;
      const {latitude: lat2, longitude: lng2} = props.destination;
      const y = Math.sin(lng2 - lng1) * Math.cos(lat2);
      const x =
        Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1);
      const θ = Math.atan2(y, x);
      const brng = ((θ * 180) / Math.PI + 360) % 360;
      return brng;
    }
    return 0;
  };

  const getAddress = (location: {latitude: number; longitude: number}) => {
    Geocoder.from(location.latitude, location.longitude)
      .then(json => {
        const addressComponent = json.results[0].formatted_address;
        setAddress(addressComponent);
      })
      .catch(error => console.warn(error));
  };

  const getCurrentLocation = async () => {
    if (homeContext?.permissionStatus === 'granted') {
      Geolocation.getCurrentPosition(
        async position => {
          const locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            heading: position.coords?.heading,
          };
          setCurrentLocation(locationData);
          getAddress(locationData);
        },
        error => {
          snackBarContext?.showSnackBar(error.message, 'error');
        },
        {enableHighAccuracy: true, timeout: 30000, maximumAge: 10000}
      );
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, [homeContext?.permissionStatus]);

  useEffect(() => {
    if (props.reset > -1) {
      if (currentLocation?.latitude && currentLocation?.longitude) {
        updateRegion({
          regionData: {
            latitude: currentLocation?.latitude,
            longitude: currentLocation?.longitude,
            heading: currentLocation?.heading,
          },
          reset: true,
        });
      }
    }
  }, [props.reset]);

  useEffect(() => {
    if (currentLocation?.latitude && currentLocation?.longitude) {
      updateRegion({
        regionData: {
          latitude: currentLocation?.latitude,
          longitude: currentLocation?.longitude,
          heading: currentLocation?.heading,
        },
        updated: true,
      });
    } else {
      updateRegion({regionData: initialRegion, updated: false});
    }
  }, [
    currentLocation?.latitude,
    currentLocation?.longitude,
    currentLocation?.heading,
    address,
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    interval = setInterval(() => {
      getCurrentLocation();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Geocoder.init(KEY);
  }, []);

  return (
    <MapView
      ref={mapRef}
      initialRegion={region}
      style={styles.mapView}
      userLocationPriority="high"
      rotateEnabled={true}
      showsBuildings={true}
      showsTraffic={true}
      showsCompass={true}>
      <Marker.Animated
        ref={markerRef}
        coordinate={animatedRegion}
        title="Your Location"
        description="You are here"
        image={MapCar}
        rotation={calculateHeading()}
      />

      {acceptedJobsContext?.acceptedJobListWithoutBusiness.map(job => {
        const jobRegion = {
          latitude: job?.pickup_lat_long[0],
          longitude: job?.pickup_lat_long[1],
        };
        return (
          <Fragment key={job._id}>
            <Marker coordinate={jobRegion}>
              <CustomMarker variant="pickup" />
            </Marker>
            <MapViewDirections
              origin={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              destination={jobRegion}
              apikey={KEY}
              strokeColor={theme.SECONDARY}
              strokeWidth={5}
              optimizeWaypoints={true}
              mode="DRIVING"
            />
          </Fragment>
        );
      })}

      {sortedJobs?.map((job, index) => {
        const jobRegion = {
          latitude: job?.dropoff_lat_long[0],
          longitude: job?.dropoff_lat_long[1],
        };
        return (
          <Fragment key={job._id}>
            <Marker
              coordinate={jobRegion}
              onPress={handleOpenJobDrawer(job._id)}>
              <CustomMarker count={index + 1} variant="delivery" />
            </Marker>
            <MapViewDirections
              origin={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              destination={jobRegion}
              apikey={KEY}
              strokeColor={theme.INFO}
              strokeWidth={5}
              optimizeWaypoints={true}
              mode="DRIVING"
            />
          </Fragment>
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
  marker: {
    width: 40,
    height: 40,
  },
});

export default Map;
