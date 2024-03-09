import React from 'react';
import EditProfileComponentContainer from './EditProfileComponentContainer';
import ProfilePhoto from '../common/ProfilePhoto';
import useAuth from '../../contexts/hooks/useAuth';
import placeholder from '../../assets/placeholders/image-placeholder.png';
import {Asset} from 'react-native-image-picker';
import InputWithLabel from '../common/InputWithLabel';
import SelectVehicle from './SelectVehicle';

import ConfirmCancelButtonComb from '../common/ConfirmCancelButtonComb';
import SelectInput from '../common/SelectInput';
import useUpdateVehicles, {
  TUpdateVehicleData,
} from '../../APIs/hooks/useUpdateVehicles';
import useDispatchAppLocalData from '../../contexts/hooks/useDispatchAppLocalData';
import useSnackBarSetContext from '../../contexts/hooks/useSnackBarLoadingContext';
import {useFormik} from 'formik';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import getFileObject from '../../utils/getFileObject';
import useLanguage from '../../hooks/useLanguage';
import useGetVehicle from '../../constants/VEHICLES';

type TEditVehicleFormData = {
  vehicle_brand_name: string;
  vehicle_model: string;
  year_of_model: string;
  vehicle_license_no: string;
  permit_no: string;
};

export default function EditVehicleData() {
  const language = useLanguage();
  const auth = useAuth();

  const fuelTypes = [
    {
      label: language.EDIT_PROFILE_SCREEN.HYBRID,
      value: '1',
    },
    {
      label: language.EDIT_PROFILE_SCREEN.ELECTRIC,
      value: '2',
    },
    {
      label: language.EDIT_PROFILE_SCREEN.GAS,
      value: '3',
    },
  ];
  const driverTypes = [
    {
      label: language.EDIT_PROFILE_SCREEN.ON_DEMAND_DRIVER,
      value: '1',
    },
    {
      label: language.EDIT_PROFILE_SCREEN.PRIVATE_DRIVE,
      value: '2',
    },
    {
      label: language.EDIT_PROFILE_SCREEN.CERTIFIED_DRIVER,
      value: '3',
    },
  ];

  const vehicle = auth?.vehicle;
  const {goBack} = useCustomNavigate();
  const dispatchAppLocalData = useDispatchAppLocalData();
  const snackBar = useSnackBarSetContext();
  const updateVehicle = useUpdateVehicles();
  const vehicles = useGetVehicle();

  const [imageUri, setImageUri] = React.useState<string | undefined>(
    vehicle?.vehicle_image
  );
  const [vehicleImage, setVehicleImage] = React.useState<Asset | undefined>();

  const [selectedVehicle, setSelectedVehicle] = React.useState<string>(
    vehicle?.vehicle_type || vehicles[0].value
  );
  const [selectedFuelType, setSelectedFuelType] = React.useState<string>(
    vehicle?.fuel_type || ''
  );
  const [selectedDriverType, setSelectedDriverType] = React.useState<string>(
    vehicle?.driver_type || ''
  );

  const handleGetImage = (asset: Asset | undefined) => {
    setImageUri(asset?.uri);
    setVehicleImage(asset);
  };

  const handleUpdateVehicle = async (values: TEditVehicleFormData) => {
    if (auth?._id) {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        formData.append(key, values[key as keyof TEditVehicleFormData]);
      });
      formData.append('vehicle_type', selectedVehicle);
      formData.append('fuel_type', selectedFuelType);
      formData.append('driver_type', selectedDriverType);
      if (vehicleImage) {
        formData.append('vehicle_image', getFileObject(vehicleImage));
      }

      dispatchAppLocalData?.setIsLoading(true);
      const cleanedObject: TUpdateVehicleData = {
        driver_id: auth?._id,
        vehicle: formData,
      };

      const res = await updateVehicle(cleanedObject);
      dispatchAppLocalData?.setIsLoading(false);

      if (res.code === 200) {
        snackBar?.showSnackBar(res.message, 'success');
        goBack();
      } else {
        snackBar?.showSnackBar(res.message, 'error');
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      vehicle_brand_name: auth?.vehicle.vehicle_brand_name || '',
      vehicle_model: auth?.vehicle.vehicle_model || '',
      year_of_model: auth?.vehicle.year_of_model || '',
      vehicle_license_no: auth?.vehicle.vehicle_license_no || '',
      permit_no: auth?.vehicle.permit_no || '',
    },
    onSubmit: (value: TEditVehicleFormData) => {
      handleUpdateVehicle(value);
    },
  });

  return (
    <EditProfileComponentContainer>
      <ProfilePhoto
        image={imageUri ? {uri: imageUri} : placeholder}
        handleGetImage={handleGetImage}
      />

      <SelectVehicle
        selectedVehicle={selectedVehicle}
        setSelectedVehicle={setSelectedVehicle}
      />
      <InputWithLabel
        keyboardType="default"
        label={language.EDIT_PROFILE_SCREEN.VEHICLE_BRAND_NAME}
        hideLeftIcon
        placeholder="Brand Name"
        value={formik.values.vehicle_brand_name}
        onChangeText={formik.handleChange('vehicle_brand_name')}
        onBlur={formik.handleBlur('vehicle_brand_name')}
      />
      <SelectInput
        label="Fuel Type"
        selectedOption={
          fuelTypes.find(item => item.value === selectedFuelType)?.label || ''
        }
        setSelectedOption={setSelectedFuelType}
        options={fuelTypes}
        optionsShowingPosition="bottom"
      />

      <InputWithLabel
        keyboardType="default"
        label={language.EDIT_PROFILE_SCREEN.MODEL}
        hideLeftIcon
        placeholder={language.EDIT_PROFILE_SCREEN.MODEL}
        value={formik.values.vehicle_model}
        onChangeText={formik.handleChange('vehicle_model')}
        onBlur={formik.handleBlur('vehicle_model')}
      />
      <InputWithLabel
        keyboardType="default"
        label={language.EDIT_PROFILE_SCREEN.YEAR}
        hideLeftIcon
        placeholder={language.EDIT_PROFILE_SCREEN.YEAR_OF_MODEL}
        value={formik.values.year_of_model}
        onChangeText={formik.handleChange('year_of_model')}
        onBlur={formik.handleBlur('year_of_model')}
      />
      <InputWithLabel
        keyboardType="default"
        label={language.EDIT_PROFILE_SCREEN.LICENSE}
        hideLeftIcon
        placeholder={language.EDIT_PROFILE_SCREEN.LICENSE_PLACEHOLDER}
        value={formik.values.vehicle_license_no}
        onChangeText={formik.handleChange('vehicle_license_no')}
        onBlur={formik.handleBlur('vehicle_license_no')}
      />
      <InputWithLabel
        keyboardType="default"
        label={language.EDIT_PROFILE_SCREEN.PERMIT}
        hideLeftIcon
        placeholder={language.EDIT_PROFILE_SCREEN.PERMIT}
        value={formik.values.permit_no}
        onChangeText={formik.handleChange('permit_no')}
        onBlur={formik.handleBlur('permit_no')}
      />
      <SelectInput
        label={language.EDIT_PROFILE_SCREEN.DRIVER_TYPE}
        selectedOption={
          driverTypes.find(item => item.value === selectedDriverType)?.label ||
          ''
        }
        setSelectedOption={setSelectedDriverType}
        options={driverTypes}
        optionsShowingPosition="top"
      />
      <ConfirmCancelButtonComb
        onCancel={goBack}
        onSubmit={formik.handleSubmit}
      />
    </EditProfileComponentContainer>
  );
}
