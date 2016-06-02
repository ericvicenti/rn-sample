
import {
  Chat,
  ChatList,
} from './ChatAppViews';
import React from 'react-native';
import ChatAppActions from './ChatAppActions';

const ChatAppActionRouteMap = [
  {
    type: 'CHAT',
    getTitle: (state) => state.name,
    renderer: ({dispatch, state}) => (
      <Chat
        name={state.name}
        onChatListPress={() => {
          dispatch(ChatAppActions.chatList());
        }}
      />
    ),
  },
  {
    type: 'CHAT_LIST',
    getTitle: (state) => 'All Chats',
    renderer: ({dispatch, state}) => (
      <ChatList
        onChatSelect={(name) => {
          dispatch(ChatAppActions.chat({name}));
        }}
      />
    ),
  },
];

ChatAppActionRouteMap.locationForRoute = ({type, key, state}) => {
  switch (type) {
    case 'CHAT_LIST':
      return {path: '/', key};
    case 'CHAT':
      const {name} = state;
      return {path: '/chat', params: {name}, key};
    default:
      return null;
  }
}

module.exports = ChatAppActionRouteMap;
