import React from 'react'
import ReactDom from 'react-dom'
import App from './App.jsx'

ReactDom.hydrate(<App />, document.getElementById('root'))

// 局部刷新  HMR
if (module.hot) {
  module.hot.accept('./App.jsx', function() {
    const NextApp = require('./App.jsx').default
    ReactDom.hydrate(<NextApp />, document.getElementById('root'))
  });
}
