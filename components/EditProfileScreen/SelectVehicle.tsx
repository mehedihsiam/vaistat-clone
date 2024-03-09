import {
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import FlexRowBetween from '../common/FlexRowBetween';
import Typography from '../common/Typography';
import useCustomTheme from '../../hooks/useCustomTheme';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import useGetVehicle from '../../constants/VEHICLES';

type TSelectVehicle = {
  selectedVehicle: string;
  setSelectedVehicle: (arg: string) => void;
};

export default function SelectVehicle(props: TSelectVehicle) {
  const theme = useCustomTheme();
  const {width} = useWindowDimensions();
  const vehicles = useGetVehicle();

  const size = width / 3 - 20;

  const handleSelectVehicle = (vehicle: string) => () => {
    props.setSelectedVehicle(vehicle);
  };

  return (
    <View style={styles.container}>
      <Typography color={theme.DISABLED_TEXT}>Select Vehicle</Typography>
      <FlexRowBetween gap={10}>
        {vehicles.map(vehicle => {
          const isActive = vehicle.value === props.selectedVehicle;
          return (
            <TouchableOpacity
              key={vehicle.name}
              activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
              onPress={handleSelectVehicle(vehicle.value)}
              style={[
                styles.tab,
                {
                  height: size,
                  width: size,
                  backgroundColor: isActive
                    ? theme.PRIMARY
                    : theme.OPPOSITE_OF_ACCENT,
                  borderColor: isActive ? theme.PRIMARY : theme.DISABLED_TEXT,
                },
              ]}>
              {vehicle.icon(
                24,
                24,
                isActive ? theme.OPPOSITE_OF_ACCENT : theme.ACCENT
              )}
              <Typography
                color={isActive ? theme.OPPOSITE_OF_ACCENT : theme.ACCENT}>
                {vehicle.name}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </FlexRowBetween>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 10,
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 8,
    borderWidth: 1,
  },
});
