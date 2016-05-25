
import React, {
  Component,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  AsyncStorage,
  View,
} from 'react-native';

// AsyncStorage.clear();

let uniqueCount = 0;

import {
  Chat,
  ChatList,
} from './ChatAppViews';

import {
  AnimatedView,
  Card,
  Header,
  StateUtils,
} from './react-navigation/lib/react-navigation';






//
// const ChatAppActionRouteMap = createActionRouteMap([
//   {
//     type: 'CHAT',
//     renderer: (props) => (
//       <Card
//         renderScene={({scene}) =>
//           <Chat
//             name={scene.navigationState.state.name}
//             onChatListPress={() => {
//               props.onDispatch(ChatApp.Actions.chatList());
//             }}
//           />
//         }
//       />
//     ),
//   },
//   {
//     type: 'CHAT_LIST',
//     renderer: (props) => (
//       <Card
//         renderScene={({scene}) =>
//           <ChatList
//             onChatSelect={(name) => {
//               props.onDispatch(ChatApp.Actions.chat({name}));
//             }}
//           />
//         }
//       />
//     ),
//   },
// ]);







const defaultNavState = {
  children: [
    {key: 'ChatList', type: 'CHAT_LIST'}
  ],
  index: 0,
};

class ChatApp extends Component {

  static Actions = {
    back: () => ({type: 'BACK'}),
    default: () => ({type: 'CHAT_LIST'}),
    chatList: () => ({type: 'CHAT_LIST'}),
    chat: ({name}) => ({type: 'CHAT', name}),
  };

  static navigationReducer = (state = defaultNavState, action) => {
    const routeToPush = ChatApp.pushedRouteWithAction(action);
    if (routeToPush) {
      if (!state) {
        return { children: [routeToPush], index: 0 };
      }
      return StateUtils.push(state, routeToPush);
    }
    if (action.type === 'BACK') {
      return StateUtils.pop(state);
    }
    return state;
  };

  static pushedRouteWithAction = (action) => {
    switch (action.type) {
      case 'CHAT':
        return {
          key: `CHAT_${Date.now()}_${uniqueCount++}`,
          path: '/chat/'+action.name,
          ...action,
        };
      case 'CHAT_LIST':
        return {
          key: `CHAT_LIST_${Date.now()}_${uniqueCount++}`,
          path: '/',
          ...action,
        };
      default:
        return null;
    }
  };

  static getTitle = (child) => {
    switch (child.type) {
      case 'CHAT_LIST':
        return 'All Chats';
      case 'CHAT':
        return child.name;
      default:
        return 'Unknown';
    }
  }

  static actionWithLocation = ({path, params}) => {
    const {name} = params;
    if (path === '/chat' && name) {
      return ChatApp.Actions.chat({name});
    }
    return null;
  };

  static renderScene = (onDispatch, {scene}) => {
    const route = scene.navigationState;
    switch (route.type) {
      case 'CHAT_LIST':
        return (
          <ChatList
            onChatSelect={(name) => {
              onDispatch(ChatApp.Actions.chat({name}))
            }}
          />
        );
      case 'CHAT':
        return (
          <Chat
            name={route.name}
            onChatListPress={() => {
              onDispatch(ChatApp.Actions.chatList())
            }}
          />
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <AnimatedView
        style={styles.container}
        navigationState={this.props.navigationState}
        renderScene={(props) => (
          <Card
            renderScene={ChatApp.renderScene.bind(this, this.props.onDispatch)}
            onBackGesture={() => {
              this.props.onDispatch(ChatApp.Actions.back());
            }}
            {...props}
          />
        )}
      />
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = ChatApp;
