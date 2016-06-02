
import React, {
  AsyncStorage,
  BackAndroid,
  Linking,
  Platform,
} from 'react-native';

import ArticlesApp from './ArticlesApp'
import ChatApp from './ChatApp'

const MainApp = ArticlesApp;

// For a simpler example:
// const MainApp = ChatApp;

import { parseUrlWithPrefix } from './utils'

const APP_STATE_KEY = 'ArticlesAppState';

class AppContainer extends React.Component {
  state = {
    appState: undefined,
  };
  render() {
    if (!this.state.appState) {
      return null;
    }
    return (
      <MainApp
        dispatch={this._handleAction}
        state={this.state.appState}
      />
    );
  }

  _handleAction = (action) => {
    const newAppState = MainApp.reduce(this.state.appState, action);
    if (newAppState !== this.state.appState) {
      this.setState({
        appState: newAppState,
      });
      AsyncStorage.setItem(APP_STATE_KEY, JSON.stringify(newAppState));
      return true;
    }
    return false;
  };

  componentDidMount() {
    Linking.getInitialURL().then(url => {
      const linkAction = url && MainApp.actionWithLocation(parseUrlWithPrefix(url, 'navapp:/'));
      AsyncStorage.getItem(APP_STATE_KEY, (err, savedPropsString) => {
        const savedProps = !err && savedPropsString && JSON.parse(savedPropsString);
        if (savedProps && linkAction) {
          this.setState({
            appState: MainApp.reduce(savedProps, linkAction),
          });
        } else if (savedProps) {
          this.setState({
            appState: savedProps,
          });
        } else {
          this.setState({
            appState: MainApp.reduce(undefined, MainApp.Actions.default()),
          })
        }
      });
    });
    Linking.addEventListener('url', this._handleOpenURL);
    BackAndroid.addEventListener('hardwareBackPress', this._handleBack);
  }
  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBack);
  }
  _handleOpenURL = (event) => {
    const location = parseUrlWithPrefix(event.url, 'navapp:/');
    const linkAction = MainApp.actionWithLocation(location);
    if (linkAction) {
      this._handleAction(linkAction);
    }
  };
  _handleBack = () => {
    return this._handleAction(MainApp.Actions.back());
  };
}

module.exports = AppContainer;
