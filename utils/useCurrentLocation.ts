import Geolocation from 'react-native-geolocation-service';
import useDispatchAppLocalData from '../contexts/hooks/useDispatchAppLocalData';

const useCurrentLocation = () => {
  const dispatch = useDispatchAppLocalData();

  const getCurrentLocation = () => {
    try {
      Geolocation.getCurrentPosition(
        position => {},
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
      );
    } catch (e) {
      console.log(e);
    }
  };
  return getCurrentLocation;
};

export default useCurrentLocation;
