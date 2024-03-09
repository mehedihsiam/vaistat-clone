import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Asset} from 'react-native-image-picker';
import useCustomTheme from '../../hooks/useCustomTheme';
import {TSetState} from '../../types/setStateType';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import SVGs from '../../assets';
import Typography from '../common/Typography';
import useLanguage from '../../hooks/useLanguage';

type TLicenseImage = {
  image: Asset | undefined;
  setOpenPicker: TSetState<boolean>;
};

const LicenseImage = (props: TLicenseImage) => {
  const theme = useCustomTheme();
  const language = useLanguage();

  return (
    <TouchableOpacity
      activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}
      onPress={() => props.setOpenPicker(true)}
      style={[
        styles.container,
        {backgroundColor: theme.PRIMARY_THIN, borderColor: theme.PRIMARY},
      ]}>
      {props.image ? (
        <Image style={styles.image} source={{uri: props.image?.uri}} />
      ) : (
        <>
          <View style={[styles.plusCircle, {backgroundColor: theme.PRIMARY}]}>
            {SVGs.Plus(24, 24, theme.OPPOSITE_OF_ACCENT)}
          </View>
          <Typography color={theme.PRIMARY}>
            {language.LICENSE_DETAILS_SCREEN.ADD_LICENSE_IMAGE}
          </Typography>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  plusCircle: {
    width: 35,
    height: 35,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LicenseImage;
