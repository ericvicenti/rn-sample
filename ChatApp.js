
import React, {
  Component,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import {
  AnimatedView,
  Card,
  Header,
  StateUtils,
} from './react-navigation/lib/react-navigation';

const defaultNavState = {
  children: [
    {key: 'Home', type: 'ChatList'}
  ],
  index: 0,
};

class ChatApp extends Component {
  static Actions = {
    back: () => ({type: 'Back'}),
    openChat: ({name}) => ({type: 'Chat', name}),
    default: () => ({type: 'ChatList'}),
  };
  static navigationReducer = (state = defaultNavState, action) => {
    if (action.type === 'Chat') {
      return StateUtils.push(state, {
        key: action.name,
        ...action,
      });
    }
    if (action.type === 'Back') {
      return StateUtils.pop(state);
    }
    return state;
  };
  static actionWithLocation = ({path, params}) => {
    const {name} = params;
    if (path === '/chat' && name) {
      return ChatApp.Actions.openChat({name});
    }
    return null;
  };
  static getTitle = (child) => {
    switch (child.type) {
      case 'ChatList':
        return 'All Chats';
      case 'Chat':
        return 'Chat with '+child.name;
      default:
        return 'Unknown';
    }
  }
  render() {
    return (
      <AnimatedView
        style={styles.container}
        navigationState={this.props.navigationState}
        renderScene={(props) => (
          <Card
            renderScene={this.renderScene}
            onBackGesture={() => {
              this.props.onDispatch(ChatApp.Actions.back());
            }}
            {...props}
          />
        )}
      />
    );
  }
  renderScene = ({scene}) => {
    const activeChild = scene.navigationState;
    return (
      <View style={styles.scene}>
        <Text
          style={styles.title}>
          {activeChild && ChatApp.getTitle(activeChild)}
        </Text>
        <Text
          style={styles.text}
          onPress={() => {
            this.props.onDispatch(ChatApp.Actions.back());
          }}>
          Back
        </Text>
        <Text
          style={styles.text}
          onPress={() => {
            this.props.onDispatch(ChatApp.Actions.openChat({ name: 'Danny' }));
          }}>
          Danny
        </Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    paddingTop: 20,
  },
  title: {
    fontWeight: 'bold',
  }
});

module.exports = ChatApp;
