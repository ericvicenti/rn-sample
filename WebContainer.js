
import React from 'react-native'

const HTMLApp = (props) => (
  <html>
    <head>
      <title>{props.title}</title>
      <meta charSet="utf-8" />
      <meta content="initial-scale=1,width=device-width" name="viewport" />
      <script src="http://localhost:9982/livereload.js" />
      {props.styleElement}
    </head>
    <body>
      <div id="react-app" dangerouslySetInnerHTML={{ __html: props.html }} />
      <script src="/dist/main.browser.js" />
    </body>
  </html>
);

export default HTMLApp;
