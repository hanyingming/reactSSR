import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App.jsx';

const render = (Component) => {
  ReactDom.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);
// 局部刷新  HMR
if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    const NextApp = require('./App.jsx').default;
    render(NextApp);
  });
}
