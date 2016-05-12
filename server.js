
// this is aliased to react-native-web in webpack.config.js :
import React, { AppRegistry } from 'react-native'

import BlogApp from './BlogApp'
import WebContainer from './WebContainer'

AppRegistry.registerComponent('App', () => BlogApp)

const express = require('express');
const app = express();

app.use('/dist', express.static('webdist'));

app.get('*', (req, res) => {

  const initialAction = BlogApp.actionWithLocation({
    path: req.path,
    params: req.query,
  });

  const navigationState = BlogApp.navigationReducer(
    undefined,
    initialAction || BlogApp.Actions.default()
  );

  const { html, style, styleElement } = AppRegistry.prerenderApplication('App', {
    initialProps: {
      navigationState,
    },
  });

  const activeChild = navigationState.children[navigationState.index];
  const title = BlogApp.getTitle(activeChild);

  const renderedApplicationHTML = React.renderToStaticMarkup(
    <WebContainer
      html={html}
      title={title}
      styleElement={styleElement}
    />
  );

  res.send(renderedApplicationHTML);
});

const PORT = 9900;

app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`)
});
