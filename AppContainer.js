
import React, {
  AsyncStorage,
  BackAndroid,
  Linking,
  Platform,
} from 'react-native';

import BlogApp from './BlogApp'

import { parseUrlWithPrefix } from './utils'

const APP_STATE_KEY = 'BlogAppNavKeyzasdfasdfssasdfs';

class AppContainer extends React.Component {
  state = {
    navigationState: undefined,
  };
  componentDidMount() {
    Linking.getInitialURL().then(url => {
      const linkAction = url && BlogApp.actionWithLocation(parseUrlWithPrefix(url, 'navapp:/'));
      AsyncStorage.getItem(APP_STATE_KEY, (err, savedPropsString) => {
        const savedProps = !err && savedPropsString && JSON.parse(savedPropsString);
        if (savedProps && linkAction) {
          this.setState({
            navigationState: BlogApp.navigationReducer(savedProps, linkAction),
          });
        } else if (savedProps) {
          this.setState({
            navigationState: savedProps,
          });
        } else {
          this.setState({
            navigationState: BlogApp.navigationReducer(undefined, BlogApp.Actions.default()),
          })
        }
      });
    });
    Platform.OS !== 'android' &&
      Linking.addEventListener('url', this._handleOpenURL);
    Platform.OS === 'android' &&
      BackAndroid.addEventListener('hardwareBackPress', this._handleBack);
  }
  componentWillUnmount() {
    Platform.OS !== 'android' &&
      Linking.removeEventListener('url', this._handleOpenURL);
    Platform.OS === 'android' &&
      BackAndroid.removeEventListener('hardwareBackPress', this._handleBack);
  }
  _handleOpenURL = (event) => {
    const location = parseUrlWithPrefix(event.url, 'navapp:/');
    const linkAction = BlogApp.actionWithLocation(location);
    if (linkAction) {
      this._handleAction(linkAction);
    }
  };
  _handleBack = () => {
    return this._handleAction(BlogApp.Actions.back());
  };
  _handleAction = (action) => {
    const nextNavState = BlogApp.navigationReducer(this.state.navigationState, action);
    if (nextNavState !== this.state.navigationState) {
      this.setState({
        navigationState: nextNavState,
      });
      AsyncStorage.setItem(APP_STATE_KEY, JSON.stringify(nextNavState));
      return true;
    }
    return false;
  };
  render() {
    if (!this.state.navigationState) {
      return null;
    }
    return (
      <BlogApp
        onDispatch={this._handleAction}
        navigationState={this.state.navigationState}
      />
    );
  }
}

module.exports = AppContainer;
