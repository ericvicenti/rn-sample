
import {BaseActions} from './utils';

const ChatAppActions = {
  ...BaseActions,
  default: () => ({type: 'CHAT_LIST'}),
  chatList: () => ({type: 'CHAT_LIST'}),
  chat: ({name}) => ({type: 'CHAT', name}),
};

module.exports = ChatAppActions;
