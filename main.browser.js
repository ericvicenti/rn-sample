
import React, { AppRegistry } from 'react-native'
import ArticlesApp from './ArticlesApp'

const queryString = require('query-string');

function setTitle(t) {
  document.title = t;
}

function locationToHostURI(location) {
  return location.path + (location.params ? "?" + queryString.stringify(location.params) : "");
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
    let navState = ArticlesApp.reduce(undefined, ArticlesApp.Actions.default());
    navState = ArticlesApp.reduce(navState, action);
    this.state = {
      navigation: navState,
    };
  }

  componentDidMount() {
    this._handlePopState = this._handlePopState.bind(this);
    window.onpopstate = this._handlePopState;
    const {routes, index} = this.state.navigation;
    const location = ArticlesApp.locationForRoute(routes[index]);
    const path = locationToHostURI(location);
    window.history.replaceState(this.state.navigation, null, path);
  }

  _handlePopState(e) {
    if (!e.state) {
      debugger;
      return;
    }
    const navState = this.state.navigation;
    const jumpToKey = e.state.routes[e.state.index].key;
    const currentKey = navState.routes[navState.index].key;
    if (currentKey !== jumpToKey) {
      this._handleAction(ArticlesApp.Actions.jumpTo(jumpToKey), true);
    }
  }

  _actionWithLocation(location) {
    return ArticlesApp.actionWithLocation({
      params: queryString.parse(location.search),
      path: location.pathname,
      key: location.state,
    });
  }

  _handleAction = (action, shouldSuppressBrowserNavigation) => {
    const lastNavState = this.state.navigation;
    const newNavState = ArticlesApp.reduce(lastNavState, action);
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
    const activeRoute = navState.routes[navState.index];
    const newLocation = ArticlesApp.locationForRoute(activeRoute);
    const newTitle = ArticlesApp.getTitle(activeRoute);
    const indexDelta = lastNavState && navState.index - lastNavState.index;
    const path = locationToHostURI(newLocation);
    if (indexDelta === 1) {
      // Push one route:
      window.history.pushState(navState, null, path);
      window.document.title = newTitle;
      pushCount++;
      return;
    }
    if (indexDelta < 0) {
      // Go back, but not so far as to back out of the app:
      const goDelta = Math.max(indexDelta, origHistoryLength - history.length);
      if (goDelta < 0) {
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
      <ArticlesApp
        dispatch={this._handleAction}
        state={this.state.navigation}
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
