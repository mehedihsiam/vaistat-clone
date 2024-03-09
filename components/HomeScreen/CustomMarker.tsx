import {View, StyleSheet} from 'react-native';
import React from 'react';
import SVGs from '../../assets';
import useCustomTheme from '../../hooks/useCustomTheme';
import Typography from '../common/Typography';

type TCustomMarker = {
  variant: 'delivery' | 'pickup';
  count?: number;
};

const CustomMarker = (props: TCustomMarker) => {
  const theme = useCustomTheme();

  const getMarker = () => {
    switch (props.variant) {
      case 'delivery':
        return SVGs.LocationDelivery(40, 40, theme.INFO);
      case 'pickup':
        return SVGs.LocationPharmacy(40, 40, theme.SECONDARY);

      default:
        return SVGs.LocationDelivery(40, 40, theme.INFO);
    }
  };

  return (
    <View style={styles.marker}>
      {props.variant === 'delivery' && (
        <View style={[styles.markerCount, {borderColor: theme.INFO}]}>
          <Typography fontSize={12} color={theme.DANGER}>
            {props.count}
          </Typography>
        </View>
      )}
      {getMarker()}
    </View>
  );
};

const styles = StyleSheet.create({
  marker: {
    width: 40,
    height: 50,
    position: 'relative',
  },
  markerCount: {
    position: 'absolute',
    top: 30,
    right: 10,
    height: 20,
    width: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    zIndex: 1,
  },
});

export default CustomMarker;
