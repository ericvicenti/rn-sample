
import React, {
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Transitioner,
  Card,
  Header,
} from './react-navigation/lib/react-navigation';

import {createActionRouteMap} from './utils';

import ArticlesAppActionRouteMap from './ArticlesAppActionRouteMap';
import ArticlesAppActions from './ArticlesAppActions';
import ArticlesAppPosts from './ArticlesAppPosts';

const RouteMap = createActionRouteMap(ArticlesAppActionRouteMap);

class ArticlesApp extends Component {

  static Actions = ArticlesAppActions;

  static reduce = RouteMap.reduce;
  static getTitle = RouteMap.getTitle;

  static actionWithLocation = ArticlesAppActionRouteMap.actionWithLocation;

  render() {
    return (
      <Transitioner
        navigationState={this.props.state}
        render={(props) => (
          <View style={styles.container} onLayout={props.onLayout}>
            <View style={styles.container}>
              {props.scenes.map(this._renderScene.bind(this, props))}
            </View>
            {this._renderHeader(props)}
          </View>
        )}
      />
    );
  }

  _renderScene = (props, scene) => {
    const {dispatch} = this.props;
    const {state} = scene.route;
    return (
      <Card
        scene={scene}
        renderScene={({scene}) => {
          const renderer = RouteMap.getRenderer(scene.route.type);
          if (renderer) {
            return renderer({state, dispatch});
          }
          return null;
        }}
        onBackGesture={() => {
          dispatch(ArticlesAppActions.back());
        }}
        {...props}
      />
    );
  };

  _renderHeader = (props) => {
    return (
      <Header
        {...props}
        onBackPress={() => {
          this.props.dispatch(ArticlesAppActions.back());
        }}
        renderTitleComponent={this._renderTitleComponent}
        renderRightComponent={this._renderHeaderButton}
      />
    );
  };

  _renderTitleComponent = (props) => {
    return (
      <Header.Title>
        {ArticlesApp.getTitle(props.scene.route)}
      </Header.Title>
    );
  };

  _renderHeaderButton = (props) => {
    const {state} = this.props;
    const route = state.routes[state.index];
    if (route.type === 'POST') {
      const post = ArticlesAppPosts.find(p => p.id === route.state.id);
      return (
        <Text
          onPress={() => {
            const name = 'Discuss "' + post.title + '"';
            this.props.dispatch(ArticlesAppActions.chat({name}))
          }}
          style={styles.headerButton}>
        Comment
        </Text>
      );
    }
    return null;
  };






  static locationForRoute = ArticlesAppActionRouteMap.locationForRoute;

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
});

module.exports = ArticlesApp;
