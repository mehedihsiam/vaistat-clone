import {View, StyleSheet} from 'react-native';
import React from 'react';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import useCustomTheme from '../../hooks/useCustomTheme';
import Button from '../Button';
import useLanguage from '../../hooks/useLanguage';

type TNotDeliveredScreenFooter = {
  onPress: () => void;
  disabled?: boolean;
};

export default function NotDeliveredScreenFooter(
  props: TNotDeliveredScreenFooter
) {
  const language = useLanguage();
  const theme = useCustomTheme();

  return (
    <View style={styles.container}>
      <Button
        variant="fillRounded"
        backgroundColor={theme.PRIMARY}
        textColor={theme.OPPOSITE_OF_ACCENT}
        title={language.COMMON_TEXTS.SUBMIT}
        onPress={props.onPress}
        disabled={props.disabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 10,
    padding: COMMONLY_USED_DATA.SCREEN_PADDING,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -14,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: -28,
  },
});
