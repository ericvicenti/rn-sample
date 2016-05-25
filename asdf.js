
let uniqueRouteCount = 0;

import {createActionRouteMap} from './utils';

var blogMap = ActionRouteMap([
  {
    type: 'PAGE',
    reducer: BlogPage.navigationReducer,
    renderer: (props) => (
      <Card
        renderScene={(props) =>
          <BlogPage {...props.scene.navigationState} />
        }
      />
    ),
  },

const ChatAppActionRouteMap = createActionRouteMap([
  {
    type: 'CHAT',
    renderer: (props) => (
      <Card
        renderScene={({scene}) =>
          <Chat
            name={scene.navigationState.state.name}
            onChatListPress={() => {
              props.onDispatch(ChatApp.Actions.chatList());
            }}
          />
        }
      />
    ),
  },
  {
    type: 'CHAT_LIST',
    renderer: (props) => (
      <Card
        renderScene={({scene}) =>
          <ChatList
            onChatSelect={(name) => {
              props.onDispatch(ChatApp.Actions.chat({name}));
            }}
          />
        }
      />
    ),
  },
]);
route={...scene.navigationState} />

const nextNavState = blogMap.reduce(lastNavState, action);

const renderedScene = blogMap.render(props);
