import {View, StyleSheet} from 'react-native';
import React from 'react';
import Typography from '../common/Typography';
import useCustomTheme from '../../hooks/useCustomTheme';
import CheckBox from '../common/CheckBox';
import {TSetState} from '../../types/setStateType';

type TSignUpInfoListCheckbox = {
  list: string[];
  title: string;
  selectedItems: string[];
  setSelectedItems: TSetState<string[]>;
  values?: string[];
};

export default function SignUpInfoListCheckbox(props: TSignUpInfoListCheckbox) {
  const theme = useCustomTheme();
  const {selectedItems, setSelectedItems, title, list} = props;

  const handleCheck = (item?: string) => {
    if (item) {
      if (selectedItems.includes(item)) {
        setSelectedItems(selectedItems.filter(i => i !== item));
      } else {
        setSelectedItems([...selectedItems, item]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Typography color={theme.DISABLED_TEXT}>{title}</Typography>
      {list.map((item, index) => (
        <CheckBox
          key={item}
          label={item}
          onPressCheckbox={handleCheck}
          isChecked={selectedItems.includes(props.values?.[index] || item)}
          value={props.values?.[index]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 10,
  },
});
