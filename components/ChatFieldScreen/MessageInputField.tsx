import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import SVGs from '../../assets';
import COMMONLY_USED_DATA from '../../constants/COMMONLY_USED_DATA';
import useCustomTheme from '../../hooks/useCustomTheme';
import ChatMessageInput from './ChatMessageInput';
import TransparentButton from '../common/TransparentButton';

type TMessageInputField = {
  onSubmit: (text: string) => void;
};

const MessageInputField = (props: TMessageInputField) => {
  const theme = useCustomTheme();
  const [message, setMessage] = useState('');

  const handleChangeMessage = (text: string) => {
    setMessage(text);
  };

  const handleSubmitMessage = () => {
    props.onSubmit(message);
    setMessage('');
  };

  return (
    <View style={styles.messageInputContainer}>
      <ChatMessageInput onChange={handleChangeMessage} value={message} />
      {message ? (
        <TransparentButton onPress={handleSubmitMessage}>
          {SVGs.Send(24, 24, theme.PRIMARY)}
        </TransparentButton>
      ) : (
        <TransparentButton>
          {SVGs.Mic(24, 24, theme.DISABLED_TEXT)}
        </TransparentButton>
      )}
    </View>
  );
};

export default MessageInputField;

const styles = StyleSheet.create({
  messageInputContainer: {
    width: '100%',
    paddingHorizontal: COMMONLY_USED_DATA.SCREEN_PADDING,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeButton: {},
});
