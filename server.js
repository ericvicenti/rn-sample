
// this is aliased to react-native-web in webpack.config.js :
import React, { AppRegistry } from 'react-native'

import ArticlesApp from './ArticlesApp'
import WebContainer from './WebContainer'

AppRegistry.registerComponent('App', () => ArticlesApp)

const express = require('express');
const app = express();

app.use('/dist', express.static('webdist'));

app.get('*', (req, res) => {

  const initialAction = ArticlesApp.actionWithLocation({
    path: req.path,
    params: req.query,
  });

  let state = ArticlesApp.reduce(
    undefined,
    ArticlesApp.Actions.default()
  );

  if (initialAction) {
    state = ArticlesApp.reduce(
      state,
      initialAction
    );
  }

  const { html, style, styleElement } = AppRegistry.prerenderApplication('App', {
    initialProps: {
      state,
    },
  });

  const route = state.routes[state.index];
  const title = ArticlesApp.getTitle(route);

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
