import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import useCustomTheme from '../../hooks/useCustomTheme';
import SingleMessage from './SingleMessage';

type TChatField = {
  chats: string[];
};

const ChatField = (props: TChatField) => {
  const theme = useCustomTheme();
  const {chats} = props;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.container, {backgroundColor: theme.DISABLED_BG}]}>
      {chats.map((chat, index) => (
        <SingleMessage
          message={chat}
          person={index % 2 === 0 ? 'receiver' : 'sender'}
          key={index}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    width: '100%',
    backgroundColor: 'red',
    flex: 1,
  },
});

export default ChatField;
