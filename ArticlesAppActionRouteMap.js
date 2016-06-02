
import {
  IndexPage,
  PostPage,
} from './ArticlesAppViews';
import React from 'react-native';
import ArticlesAppActions from './ArticlesAppActions';
import ArticlesAppPosts from './ArticlesAppPosts';
import ChatAppActionRouteMap from './ChatAppActionRouteMap';

const ArticlesAppActionRouteMap = [
  {
    type: 'INDEX',
    getTitle: (state) => 'Articles in React',
    renderer: (props) => (
      <IndexPage
        name={props.state.name}
        dispatch={props.dispatch}
      />
    ),
  },
  {
    type: 'POST',
    getTitle: (state) => ArticlesAppPosts.find(p => p.id === state.id).title,
    renderer: (props) => (
      <PostPage
        postId={props.state.id}
        dispatch={props.dispatch}
      />
    ),
  },
  ...ChatAppActionRouteMap,
];

ArticlesAppActionRouteMap.actionWithLocation = ({path, params}) => {
  if (path === '/') {
    return ArticlesAppActions.default();
  }
  const matchedPost = ArticlesAppPosts.find(post => '/' + post.id === path);
  if (matchedPost) {
    return ArticlesAppActions.post(matchedPost.id);
  }
  return null;
};

ArticlesAppActionRouteMap.locationForRoute = ({type, key, state}) => {
  switch (type) {
    case 'INDEX':
      return {
        path: '/',
        key,
      };
    case 'POST':
      return {
        path: `/${state.id}`,
        key,
      };
    default:
      const chatLocation = ChatAppActionRouteMap.locationForRoute({type, key, state});
      if (chatLocation) {
        return chatLocation;
      }
      return null;
  }
};

module.exports = ArticlesAppActionRouteMap;
