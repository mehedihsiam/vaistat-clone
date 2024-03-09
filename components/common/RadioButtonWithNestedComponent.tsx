import {StyleSheet, View} from 'react-native';
import React from 'react';
import SingleMethodContainer from './SingleMethodContainer';
import MethodHeadingButton from '../PaymentScreen/MethodHeadingButton';
import CommonMethodHeading from '../PaymentScreen/CommonMethodHeading';

type TOrderDeliveryRadioButton = {
  title: string;
  onPress: () => void;
  isActive: boolean;
  activeChildren: React.ReactNode | null;
};

export default function RadioButtonWithNestedComponent(
  props: TOrderDeliveryRadioButton
) {
  return (
    <SingleMethodContainer>
      <MethodHeadingButton onPress={props.onPress}>
        <CommonMethodHeading isActive={props.isActive} title={props.title} />
      </MethodHeadingButton>
      {props.isActive && props.activeChildren && (
        <View style={styles.activeChildrenContainer}>
          {props.activeChildren}
        </View>
      )}
    </SingleMethodContainer>
  );
}

const styles = StyleSheet.create({
  activeChildrenContainer: {
    padding: 16,
    paddingTop: 0,
  },
});
