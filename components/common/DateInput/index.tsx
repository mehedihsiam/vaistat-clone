import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import COMMONLY_USED_DATA from '../../../constants/COMMONLY_USED_DATA';
import useCustomTheme from '../../../hooks/useCustomTheme';
import SVGs from '../../../assets';
import Typography from '../Typography';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type TDateInput = {
  date: Date;
  setDate: (date: Date) => void;
  label: string;
};

export default function DateInput(props: TDateInput) {
  const theme = useCustomTheme();
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    props.setDate(date);
    hideDatePicker();
  };

  return (
    <>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
        date={props.date}
      />
      <View style={styles.container}>
        <View
          style={[styles.label, {backgroundColor: theme.OPPOSITE_OF_ACCENT}]}>
          <Typography color={theme.DISABLED_TEXT} fontSize={12}>
            {props.label}
          </Typography>
        </View>
        <TouchableOpacity
          onPress={showDatePicker}
          style={styles.field}
          activeOpacity={COMMONLY_USED_DATA.ACTIVE_OPACITY}>
          {SVGs.Calendar(24, 24, theme.DISABLED_TEXT)}
          <Typography>{new Date(props.date).toLocaleDateString()}</Typography>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    position: 'relative',
    zIndex: 2,
    marginTop: 10,
    flex: 1,
  },
  label: {
    height: 20,
    position: 'absolute',
    top: -10,
    left: 10,

    zIndex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  field: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
