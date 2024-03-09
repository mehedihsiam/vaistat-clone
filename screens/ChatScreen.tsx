import React, {useState} from 'react';
import ChatField from '../components/ChatFieldScreen/ChatField';
import NonScrollableScreenContainer from '../containers/NonScrollableScreenContainer';
import MessageInputField from '../components/ChatFieldScreen/MessageInputField';
import ScreenTitle from '../components/common/ScreenTitle';
import COMMONLY_USED_DATA from '../constants/COMMONLY_USED_DATA';

export default function ChatScreen() {
  const [chats, setChats] = useState<string[]>([]);

  const handleSubmit = (text: string) => {
    setChats([...chats, text]);
  };

  return (
    <NonScrollableScreenContainer
      paddingHorizontal={0.001}
      paddingVertical={0.001}>
      <ScreenTitle
        title="Chat"
        showBackButton
        paddingHorizontal={COMMONLY_USED_DATA.SCREEN_PADDING}
      />

      <ChatField chats={chats} />
      <MessageInputField onSubmit={handleSubmit} />
    </NonScrollableScreenContainer>
  );
}
