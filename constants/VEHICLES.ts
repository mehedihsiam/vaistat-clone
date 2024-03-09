import SVGs from '../assets';
import useLanguage from '../hooks/useLanguage';

export type TVehicleOption = {
  name: string;
  value: string;
  icon: (height?: number, width?: number, color?: string) => React.JSX.Element;
};

const useGetVehicle = () => {
  const language = useLanguage();
  const VEHICLES: TVehicleOption[] = [
    {
      value: '1',
      name: language.EDIT_PROFILE_SCREEN.CAR,
      icon: SVGs.Car,
    },

    {
      value: '2',
      name: language.EDIT_PROFILE_SCREEN.SCOOTER,
      icon: SVGs.Scooter,
    },
    {
      value: '3',
      name: language.EDIT_PROFILE_SCREEN.BICYCLE,
      icon: SVGs.Bicycle,
    },
  ];
  return VEHICLES;
};

export default useGetVehicle;
