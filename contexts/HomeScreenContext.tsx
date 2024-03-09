import React, {createContext, useEffect, useState} from 'react';
import useShowAlert from '../hooks/useShowAlert';
import {
  currentLocationText,
  iosLocationSettingsText,
} from '../constants/ALERT_OBJECTS';
import {navigateToIosLocationSettings} from '../utils/navigateToSettings';
import {Platform} from 'react-native';
import {AndroidLocationPermissions} from '../utils/andoidLocationPermission';
import {IosLocationPermission} from '../utils/iosLocationPermissions';
import useSnackBarSetContext from './hooks/useSnackBarLoadingContext';
import ActiveJobDrawer from '../components/HomeScreen/ActiveJobDrawer';

export type THomeCompName = 'map' | 'jobs' | 'emergency';

export const HomeComponentsName = {
  JOBS: 'jobs' as 'jobs',
  EMERGENCY: 'emergency' as 'emergency',
};

type THomeStates = {
  permissionStatus?: string | undefined;
};

type TDispatch = {
  setActiveComponent: (comp: THomeCompName) => void;
  setOpenJobDrawer: (value: boolean, job_id?: string) => void;
};

const initialState: THomeStates = {
  permissionStatus: undefined,
};

export const HomeScreenContext = createContext<THomeStates | null>(null);
export const HomeScreenContextDispatch = createContext<TDispatch | undefined>(
  undefined
); // for setting state

type Props = {
  children: React.ReactNode;
};

export default function HomeScreenArea(props: Props) {
  const [data, setData] = React.useState<THomeStates | null>(initialState);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [jobId, setJobId] = useState<string | undefined>(undefined);
  const showAlert = useShowAlert();
  const snackBar = useSnackBarSetContext();

  const [permissionStatus, setPermissionStatus] = useState<string | undefined>(
    undefined
  );

  const iosLocationSettingsAlert = () => {
    showAlert({
      title: iosLocationSettingsText.title,
      message: iosLocationSettingsText.message,
      onPressYes: navigateToIosLocationSettings,
      negativeText: 'Cancel',
      positiveText: 'Settings',
      negativeStyle: 'cancel',
    });
  };

  const getLocation = async () => {
    if (Platform.OS === 'android') {
      const res = await AndroidLocationPermissions();
      setPermissionStatus(res);
    } else {
      const res = await IosLocationPermission();
      setPermissionStatus(res);
    }
  };

  const allowCurrentLocationAlertYesPressHandler = async () => {
    await getLocation();
  };
  const allowCurrentLocationAlertNoPressHandler = async () => {
    snackBar?.showSnackBar('Location permission is required', 'warning');
  };

  useEffect(() => {
    if (permissionStatus === 'disabled' && Platform.OS === 'ios') {
      iosLocationSettingsAlert();
    }
  }, [permissionStatus]);

  useEffect(() => {
    showAlert({
      title: currentLocationText.title,
      message: currentLocationText.message,
      onPressNo: allowCurrentLocationAlertNoPressHandler,
      onPressYes: allowCurrentLocationAlertYesPressHandler,
    });
  }, []);

  const dispatch = {
    setActiveComponent(_comp: THomeCompName) {
      setData({...data});
    },
    setOpenJobDrawer(value: boolean, job_id?: string) {
      setJobId(job_id);
      setOpenDrawer(value);
    },
  };

  return (
    <HomeScreenContext.Provider
      value={{
        permissionStatus,
      }}>
      {(openDrawer && (
        <ActiveJobDrawer
          isOpen={openDrawer}
          handleClose={() => setOpenDrawer(false)}
          job_id={jobId}
        />
      )) ||
        null}
      <HomeScreenContextDispatch.Provider value={dispatch}>
        {props.children}
      </HomeScreenContextDispatch.Provider>
    </HomeScreenContext.Provider>
  );
}
