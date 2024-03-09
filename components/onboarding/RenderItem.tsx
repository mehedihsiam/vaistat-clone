import React from 'react';
import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {TOnboardingData} from '../OnBoardItem/OnboardingData';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import useCustomTheme from '../../hooks/useCustomTheme';

type Props = {
  item: TOnboardingData;
};

const RenderItem = ({item}: Props) => {
  const {width: SCREEN_WIDTH} = useWindowDimensions();
  const theme = useCustomTheme();

  const textColor = {color: theme.ACCENT};

  return (
    <View
      style={[
        styles.itemContainer,
        {width: SCREEN_WIDTH - COMMONLY_USED_DATA.SCREEN_PADDING * 2},
      ]}>
      {item.img}
      <Text style={[styles.itemText, textColor]}>{item.title}</Text>
      <Text style={styles.itemDetails}>{item.details}</Text>
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    width: '100%',
    flex: 1,
  },
  itemText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    marginHorizontal: 20,
  },
  itemDetails: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
  },
});
