
import React, { AppRegistry } from 'react-native'
import BlogApp from './BlogApp'

const queryString = require('query-string');

function setTitle(t) {
  document.title = t;
}

function getLastInArray(arr) {
  return arr[arr.length - 1];
}

const origHistoryLength = history.length;
let pushCount = 0;

class BrowserApp extends React.Component {
  constructor() {
    super();
    const action = this._actionWithLocation(window.location);
    const navState = BlogApp.navigationReducer(undefined, action);
    this.state = {
      navigation: navState,
    };
  }

  componentDidMount() {
    this._handlePopState = this._handlePopState.bind(this);
    window.onpopstate = this._handlePopState;
    const location = BlogApp.locationWithState(this.state.navigation);
    const path = location.path + (location.params ? "?" + location.params : "");
    window.history.replaceState(this.state.navigation, null, path);
  }

  _handlePopState(e) {
    if (!e.state) {
      debugger;
      return;
    }
    const navState = this.state.navigation;
    const jumpToKey = e.state.children[e.state.index].key;
    const currentKey = navState.children[navState.index].key;
    if (currentKey !== jumpToKey) {
      this._handleAction(BlogApp.Actions.jumpTo(jumpToKey), true);
    }
  }

  _actionWithLocation(location) {
    return BlogApp.actionWithLocation({
      params: queryString.parse(location.search),
      path: location.pathname,
      key: location.state,
    });
  }

  _handleAction = (action, shouldSuppressBrowserNavigation) => {
    const lastNavState = this.state.navigation;
    const newNavState = BlogApp.navigationReducer(lastNavState, action);
    if (newNavState !== lastNavState) {
      this.setState({
        navigation: newNavState,
      }, () => {
        if (!shouldSuppressBrowserNavigation) {
          this._reconcileNavigationState(lastNavState);
        }
      });
      return true;
    }
    return false;
  };

  _reconcileNavigationState(lastNavState) {
    const navState = this.state.navigation;
    const newLocation = BlogApp.locationWithState(navState);
    const activeChild = navState.children[navState.index];
    const newTitle = BlogApp.getTitle(activeChild);
    const indexDelta = lastNavState && navState.index - lastNavState.index;
    const path = newLocation.path + (newLocation.params ? "?" + newLocation.params : "");
    if (indexDelta === 1) {
      // simple push:
      window.history.pushState(navState, null, path);
      window.document.title = newTitle;
      pushCount++;
      return;
    }
    if (indexDelta < 0) {
      // Go back, but not so far as to back out of the app
      const goDelta = Math.max(indexDelta, origHistoryLength - history.length);
      if (goDelta !== 0) {
        window.history.go(goDelta);
      }
      window.history.replaceState(this.state.navigation, null, path);
      window.document.title = newTitle;
      return;
    }
    // Unhandled case! This code is not perfect
  }

  render() {
    if (!this.state.navigation) {
      return null;
    }
    return (
      <BlogApp
        onDispatch={this._handleAction}
        navigationState={this.state.navigation}
      />
    );
  }
}

AppRegistry.registerComponent('App', () => BrowserApp)

AppRegistry.runApplication(
  'App',
  {
    initialProps: {},
    rootTag: document.getElementById('react-app'),
  }
);
