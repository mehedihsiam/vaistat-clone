import {View, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';
import SVGs from '../../assets';
import TransparentButton from '../common/TransparentButton';

type TChatMessageInput = {
  onChange: (text: string) => void;
  value: string;
};

export default function ChatMessageInput(props: TChatMessageInput) {
  const theme = useCustomTheme();
  return (
    <View style={[styles.container, {backgroundColor: theme.DISABLED_BG}]}>
      <TextInput
        onChangeText={props.onChange}
        value={props.value}
        placeholder="Message"
        style={styles.input}
      />
      <TransparentButton>
        {SVGs.Import(24, 24, theme.DISABLED_TEXT)}
      </TransparentButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 56,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 5,
    paddingLeft: 10,
  },

  input: {
    flex: 1,
    height: '100%',
    marginRight: 10,
  },
});
