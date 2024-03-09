import React, {useState} from 'react';
import {TSignupDataWithPhone} from '../types/signUpFormData';
import {Asset} from 'react-native-image-picker';
import {TLicenseInformation} from '../types/licenseInformation';

type TSignUpLocalDataProvider = {
  children: React.ReactNode;
};

type TData = TSignupDataWithPhone & {
  driverLicenseInfo?: TLicenseInformation;
};

type TDocuments = {
  driver_license: Asset | undefined;
  motor_insurance: Asset | undefined;
  registeration_certificate: Asset | undefined;
  profile_img: Asset | undefined;
};

type TSignUpLocalDataContext = {
  localData: TData | null;
  setLocalData: (data: TData) => void;
  documents: TDocuments | null;
  setDocuments: (data: TDocuments) => void;
};

export const SignUpLocalDataContext = React.createContext<
  TSignUpLocalDataContext | undefined
>(undefined);

export default function SignUpLocalDataArea(props: TSignUpLocalDataProvider) {
  const [data, setData] = useState<TData | null>(null);
  const [documents, setDocuments] = useState<TDocuments | null>(null);
  const value = {
    localData: data,
    documents,
    setDocuments: (arg: TDocuments) => {
      setDocuments(arg);
    },
    setLocalData: (arg: TData) => {
      setData(arg);
    },
  };

  return (
    <SignUpLocalDataContext.Provider value={value}>
      {props.children}
    </SignUpLocalDataContext.Provider>
  );
}
