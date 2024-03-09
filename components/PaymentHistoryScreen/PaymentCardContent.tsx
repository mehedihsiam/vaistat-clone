import {View, StyleSheet} from 'react-native';
import React from 'react';

import useCustomTheme from '../../hooks/useCustomTheme';
import Tag from '../common/Tag';
import Typography from '../common/Typography';
import FlexRowBetween from '../common/FlexRowBetween';
import SVGs from '../../assets';
import Spacer from '../common/Spacer';
import useLanguage from '../../hooks/useLanguage';

export type TPaymentCardContent = {
  fromLocation: string;
  toLocation: string;
  // tags: string[];
  date: Date;
  earning: number;
  status: string;
};

export default function PaymentCardContent(props: TPaymentCardContent) {
  const language = useLanguage();
  const theme = useCustomTheme();

  const getStatusTextColor = () => {
    switch (props.status) {
      case language.PAYMENT_HISTORY_SCREEN.PROCESSING:
        return theme.WARNING;

      case language.PAYMENT_HISTORY_SCREEN.PAID:
        return theme.SUCCESS;

      case language.PAYMENT_HISTORY_SCREEN.PENDING:
        return theme.WARNING;
      default:
        return theme.WARNING;
    }
  };

  return (
    <View style={styles.contentContainer}>
      <FlexRowBetween>
        <Spacer height={10} width={10} />
        {/* <FlexRowStart gap={10}>
          {props.tags.map((tag, index) => (
            <Tag
              key={index}
              tag={tag}
              backgroundColor={theme.INFO}
              color={theme.OPPOSITE_OF_ACCENT}
            />
          ))}
        </FlexRowStart> */}
        <Tag
          tag={`$${props.earning.toFixed(2)}`}
          backgroundColor={theme.SUCCESS}
          color={theme.OPPOSITE_OF_ACCENT}
        />
      </FlexRowBetween>
      <Typography color={theme.DISABLED_TEXT}>FROM</Typography>
      <Typography flex={1} fontSize={12}>
        {props.fromLocation}
      </Typography>
      <Spacer height={10} />
      <Typography color={theme.DISABLED_TEXT}>TO</Typography>
      <Typography flex={1} fontSize={12}>
        {props.toLocation}
      </Typography>
      <FlexRowBetween gap={5}>
        {SVGs.Clock(15, 15, 'black')}
        <Typography flex={1} fontSize={12} color={theme.DISABLED_TEXT}>
          {props.date.toUTCString()}
        </Typography>
        <Typography color={getStatusTextColor()}>{props.status}</Typography>
      </FlexRowBetween>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
