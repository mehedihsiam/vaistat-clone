import {View, StyleSheet} from 'react-native';
import React from 'react';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import useCustomTheme from '../../hooks/useCustomTheme';
import Typography from '../common/Typography';
import Button from '../Button';
import FlexRowBetween from '../common/FlexRowBetween';
import useLanguage from '../../hooks/useLanguage';

type TOrderDeliveryScreenFooter = {
  onDone: () => void;
  collectedAmount: number;
};

export default function OrderDeliveryScreenFooter(
  props: TOrderDeliveryScreenFooter
) {
  const language = useLanguage();
  const theme = useCustomTheme();

  return (
    <View style={styles.container}>
      {props.collectedAmount > 0 && (
        <View style={[styles.card, {backgroundColor: theme.PRIMARY_THIN}]}>
          <FlexRowBetween>
            <Typography fontWeight="700">
              {language.ORDER_DELIVERY_SCREEN.AMOUNT_COLLECTED}
            </Typography>
            <Typography fontWeight="700">
              ${props.collectedAmount?.toFixed(2)}
            </Typography>
          </FlexRowBetween>
        </View>
      )}
      <Button
        variant="fillRounded"
        backgroundColor={theme.PRIMARY}
        textColor={theme.OPPOSITE_OF_ACCENT}
        title={language.ORDER_DELIVERY_SCREEN.DELIVERY_DONE}
        onPress={props.onDone}
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
  card: {
    width: '100%',
    borderRadius: 16,
    padding: COMMONLY_USED_DATA.SCREEN_PADDING,
  },
});
