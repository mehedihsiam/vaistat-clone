import {View, StyleSheet} from 'react-native';
import React from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';
import SVGs from '../../assets';
import Typography from '../common/Typography';

type TDrawerLocationCard = {
  location: string | undefined;
};

const DrawerLocationCard = (props: TDrawerLocationCard) => {
  const theme = useCustomTheme();
  return (
    <View style={[styles.container, {backgroundColor: theme.DISABLED_BG}]}>
      {SVGs.LocationDelivery(24, 24, theme.PRIMARY)}
      <Typography flex={1} fontSize={14}>
        {props.location}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
    borderRadius: 10,
    minHeight: 50,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

export default DrawerLocationCard;
