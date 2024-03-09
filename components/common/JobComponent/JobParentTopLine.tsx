import {View, Image, StyleSheet, ImageSourcePropType} from 'react-native';
import React from 'react';

import Typography from '../Typography';
import SVGs from '../../../assets';
import useCustomTheme from '../../../hooks/useCustomTheme';

type TParentTopLine = {
  isOpen: boolean;
  name: string;
  logo: ImageSourcePropType;
  hideDownArrow?: boolean;
};

export default function JobParentTopLine(props: TParentTopLine) {
  const theme = useCustomTheme();

  const extraStyle = {
    caret: {
      transform: [{rotateX: props.isOpen ? '180deg' : '0deg'}],
    },
  };
  return (
    <View style={styles.topLine}>
      <View style={styles.nameAndLogoContainer}>
        <Image source={props.logo} style={styles.pharmacyLogo} />
        <Typography fontWeight="600">{props.name}</Typography>
      </View>
      {!props.hideDownArrow && (
        <View style={[styles.caretContainer, extraStyle.caret]}>
          {SVGs.CaretUp(24, 24, theme.ACCENT_DIMMED)}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  caretContainer: {
    width: 24,
    height: 24,
  },
  nameAndLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pharmacyLogo: {
    height: 30,
    width: 30,
    borderRadius: 5,
  },
});
