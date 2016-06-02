
import React, {
  Component,
  StyleSheet,
  View,
} from 'react-native';

import {createActionRouteMap} from './utils';
import {
  Transitioner,
  Card,
} from './react-navigation/lib/react-navigation';
import ChatAppActionRouteMap from './ChatAppActionRouteMap';
import ChatAppActions from './ChatAppActions';

const RouteMap = createActionRouteMap(ChatAppActionRouteMap);

class ChatApp extends Component {

  static Actions = ChatAppActions;
  static reduce = RouteMap.reduce;

  // render() {
  //   const {dispatch} = this.props;
  //   const {routes, index} = this.props.state;
  //   const {type, state} = routes[index];
  //   const renderer = RouteMap.getRenderer(type);
  //   if (renderer) {
  //     return renderer({state, dispatch});
  //   }
  //   return null;
  // }


  static actionWithLocation = ({path, params}) => {
    const {name} = params;
    // navapp://chat?name=Bria
    if (path === '/chat' && name) {
      return ChatAppActions.chat({name});
    }
    return null;
  };


  render() {
    return (
      <Transitioner
        navigationState={this.props.state}
        render={(props) => (
          <View style={styles.container} onLayout={props.onLayout}>
            {props.scenes.map(this._renderScene.bind(this, props))}
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
          dispatch(ChatAppActions.back());
        }}
        {...props}
      />
    );
  };





  static getTitle = RouteMap.getTitle;





}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = ChatApp;
