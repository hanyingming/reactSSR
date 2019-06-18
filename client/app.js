import React from 'react'
import ReactDom from 'react-dom'
import App from './App.jsx'
import { AppContainer } from 'react-hot-loader';

const render = Component => {
  ReactDom.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App)
// 局部刷新  HMR
if (module.hot) {
  module.hot.accept('./App.jsx', function() {
    const NextApp = require('./App.jsx').default
    render(NextApp)
  });
}
