import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './view/App';

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
  module.hot.accept('./view/App', () => {
    const NextApp = require('./view/App').default;
    render(NextApp);
  });
}
