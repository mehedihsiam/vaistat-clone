import {View, StyleSheet} from 'react-native';
import React from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';
import Typography from '../common/Typography';
import RadioOptions from '../common/RadioOptions';

type TReceiverRelationshipWithClient = {
  selected: string;
  handleSelect: (arg: string) => void;
  receivers: string[];
};

export default function ReceiverRelationshipWithClient(
  props: TReceiverRelationshipWithClient
) {
  const theme = useCustomTheme();

  const handleSelect = (option: string) => {
    props.handleSelect(option);
  };
  return (
    <View style={[styles.container, {backgroundColor: theme.DISABLED_BG}]}>
      <Typography color={theme.DISABLED_TEXT}>
        Relationship with client
      </Typography>

      <RadioOptions
        options={props.receivers}
        selectedOption={props.selected}
        onSelect={handleSelect}
        gap={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    gap: 10,
  },
});
