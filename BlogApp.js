
import React, {
  Animated,
  Component,
  Easing,
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

import ChatApp from './ChatApp';

let count = 0;

const LIPSUM = 'Sed ticidunt egestas odio, in scelerisque mauris sollicitudin ac. In quis nunc erat. Donec nec est risus. Vivamus cursus nisi commodo sodales malesuada. Ut in dictum lacus, et faucibus metus. Aenean laoreet suscipit sapien, sit amet ullamcorper neque elementum et. Quisque nec viverra nisl. Suspendisse eget molestie mauris, ut malesuada massa. Phasellus nec augue vel ante semper porttitor non ac mi. Proin convallis nunc quam, vitae molestie tortor commodo non. Proin ut arcu eros. Nullam vitae tellus id purus eleifend mollis. Donec sed faucibus diam. Nullam sagittis eleifend sem id aliquet. Quisque tempor aliquam nisl. Suspendisse potenti.\n\nInteger interdum tincidunt enim, ut dapibus sapien semper vel. Donec ac velit turpis. Integer lobortis enim ac justo maximus, non accumsan tellus tempus. Praesent sagittis bibendum ipsum, ut vehicula ligula imperdiet ut. Nunc id molestie nisl. Aliquam enim purus, finibus suscipit egestas ac, efficitur id nunc. Nulla facilisi. Integer scelerisque, dolor quis luctus aliquet, ipsum metus fermentum est, suscipit eleifend nibh ante nec neque. Ut odio ex, scelerisque vel vulputate non, fermentum ac nibh.\n\nMorbi dapibus tempor ipsum vel luctus. Nulla dictum fringilla dignissim. Proin quis leo id sem tincidunt tempus id nec sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent sapien neque, mollis sit amet ipsum sed, pulvinar condimentum risus. Donec eleifend neque sed purus bibendum, vitae semper magna pharetra. Vivamus posuere nulla eu nibh tincidunt scelerisque. Aenean magna nisi, accumsan et est id, malesuada bibendum magna. Sed dictum magna sed est gravida, ac rutrum odio pulvinar. Mauris congue mi vel nisl convallis, ac blandit libero facilisis. Etiam velit lectus, tristique sed eleifend quis, sollicitudin et turpis. Aliquam suscipit magna nec tellus commodo varius.';
const BLOG_POSTS = [
  {
    id: 'react-is-fun',
    title: "Isn't React fun!?",
    content: 'I hope you enjoyed navigating here on your platform! Enjoy some nonsense: ' + LIPSUM,
    date: '12 May 2016',
  },
  {
    id: 'lets-share-code',
    title: 'Want to share code?',
    content: 'I hope you enjoyed navigating here on your platform! Enjoy some nonsense: ' + LIPSUM,
    date: '11 May 2016',
  },
  {
    id: 'lets-blog',
    title: 'I should start a blog',
    content: 'I hope you enjoyed navigating here on your platform! Enjoy some nonsense: ' + LIPSUM,
    date: '10 May 2016',
  },
]

const defaultNavState = {
  key: 'BlogApp',
  index: 0,
  children: [
    {
      key: 'InitialPage',
      type: 'Index',
      path: '/',
    },
  ],
};

class BlogApp extends Component {

  static Actions = {
    back: () => ({
      type: 'Back',
    }),
    jumpTo: (key) => ({
      type: 'JumpTo',
      key,
    }),
    post: (id) => ({
      type: 'Post',
      id,
    }),
    default: () => ({
      type: 'Index',
    }),
  }

  static navigationReducer = function(navState = defaultNavState, action) {
    const { children, index } = navState;
    const activeChild = children[index];

    if (action.type === 'Back' && children.length > 1) {
      return StateUtils.pop(navState);
    }
    if (action.type === 'JumpTo') {
      return StateUtils.jumpTo(navState, action.key);
    }
    if (action.type === 'Index') {
      if (activeChild.type === 'Index') {
        return navState;
      }
      return StateUtils.push(navState, {
        key: `Page-${Date.now()}`,
        path: '/',
        ...action,
      });
    }
    if (action.type === 'Post') {
      return StateUtils.push(navState, {
        key: `Page-${Date.now()}`,
        path: '/'+action.id,
        ...action,
      });
    }
    const pushedChatRoute = ChatApp.pushedRouteWithAction(action);
    if (pushedChatRoute) {
      return StateUtils.push(navState, pushedChatRoute);
    }
    return navState;
  }

  static actionWithLocation = ({path, params}) => {
    if (path === '/') {
      return BlogApp.Actions.default();
    }
    const matchedPost = BLOG_POSTS.find(post => '/' + post.id === path);
    if (matchedPost) {
      return BlogApp.Actions.post(matchedPost.id);
    }
    if (path.split('/chat/').length > 1) {
      const name = path.split('/chat/')[1];
      return ChatApp.Actions.chat({name});
    }
    return null;
  };

  static getTitle = (child) => {
    switch (child.type) {
      case 'Index':
        return 'My React Blog';
      case 'Post':
        const matchedPost = BLOG_POSTS.find(post => post.id === child.id);
        if (matchedPost) {
          return matchedPost.title;
        }
        return 'Unknown Post';
      default:
        const chatTitle = ChatApp.getTitle(child);
        if (chatTitle) {
          return chatTitle;
        }
        return 'Unknown Page';
    }
  };

  static locationWithState = (state) => {
    let {path, params, key, type, id} = state.children[state.index];
    return {path, params, key};
  };

  render() {
    return (
      <AnimatedView
        style={styles.container}
        navigationState={this.props.navigationState}
        renderOverlay={this._renderOverlay}
        renderScene={this.renderScene}
      />
    );
  }

  _renderOverlay = (props) => {
    return (
      <Header
        {...props}
        onBackPress={() => {
          this.props.onDispatch(BlogApp.Actions.back());
        }}
        renderTitleComponent={this._renderTitleComponent}
        renderRightComponent={this._renderHeaderButton}
      />
    );
  };

  _renderHeaderButton = (props) => {
    const route = this.props.navigationState.children[this.props.navigationState.index];
    const post = BLOG_POSTS.find(p => p.id === route.id);
    if (route.type === 'Post') {
      return (
        <Text
          onPress={() => {
            const name = 'Discuss "' + post.title + '"';
            this.props.onDispatch(ChatApp.Actions.chat({name}))
          }}
          style={styles.headerButton}>
        Comment
        </Text>
      );
    }
    return null;
  };

  _renderTitleComponent = (props) => {
    return (
      <Header.Title>
        {BlogApp.getTitle(props.scene.navigationState)}
      </Header.Title>
    );
  };

  renderScene = (props) => {
    return (
      <Card
        {...props}
        renderScene={this._renderInnerCard}
        onBackGesture={() => {
          this.props.onDispatch(BlogApp.Actions.back());
        }}
      />
    );
  };

  _renderInnerCard = (props) => {
    const chatScene = ChatApp.renderScene(this.props.onDispatch, props);
    if (chatScene) {
      return chatScene;
    }
    const navState = props.scene.navigationState;
    if (navState.type === 'Index') {
      return this._renderBlogIndex();
    }
    if (navState.type === 'Post') {
      return this._renderPost(navState.id);
    }
    return (
      <InfoCell
        label="Not Found!"
      />
    );
  };

  _renderBlogIndex = () => {
    return (
      <ScrollView style={styles.scrollView}>
        {BLOG_POSTS.map(post => (
          <InfoCell
            label={post.title}
            onPress={() => {
              this.props.onDispatch(BlogApp.Actions.post(post.id));
            }}
          />
        ))}
      </ScrollView>
    );
  };

  _renderPost = (id) => {
    const post = BLOG_POSTS.find(p => p.id === id);
    if (!post) {
      return (
        <ScrollView style={styles.scrollView}>
          <Text style={styles.content}>Unknown Post</Text>
        </ScrollView>
      );
    }
    return (
      <ScrollView style={styles.scrollView}>
        <Text style={styles.content}>{post.content}</Text>
      </ScrollView>
    );
  };
}

const InfoCell = (props) =>
  <TouchableHighlight style={styles.infoCell} onPress={props.onPress}>
    <View style={styles.infoCellView}>
      <Text style={styles.infoCellText}>{props.label}</Text>
    </View>
  </TouchableHighlight>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    margin: 20,
  },
  headerButton: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
  infoCell: {},
  infoCellView: {
    padding: 20,
    marginTop: -StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
    backgroundColor: 'white',

  },
  scrollView: {
    marginTop: Header.HEIGHT,
  },
  infoCellText: {
    color: '#333333',
    fontSize: 18,
  },
});

module.exports = BlogApp;
