import {View, StyleSheet} from 'react-native';
import React from 'react';
import CheckBox from '../common/CheckBox';
import {TSetState} from '../../types/setStateType';

type TJobFilterCheckbox = {
  value: string;
  label: string;

  checkedFilters: string[];
  setCheckedFilters: TSetState<string[]>;
};

export default function JobFilterCheckbox(props: TJobFilterCheckbox) {
  const makingCheckedFilters = (value?: string) => {
    if (props.checkedFilters?.includes(value!)) {
      const newArray = props.checkedFilters?.filter(item => item !== value);
      props.setCheckedFilters(newArray);
    } else {
      const newArray = [...props.checkedFilters, value!];
      props.setCheckedFilters(newArray);
    }
  };

  return (
    <View style={styles.container}>
      <CheckBox
        isChecked={props.checkedFilters?.includes(props.value)}
        label={props.label}
        value={props.value}
        containerStyle={styles.checkboxStyle}
        onPressCheckbox={makingCheckedFilters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  checkboxStyle: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
});
