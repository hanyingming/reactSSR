import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'

import store from './store'
import App from './view/App'

const render = (Component) => {
  ReactDom.hydrate(
    <Provider store={store}>
      <AppContainer>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </AppContainer>
    </Provider>,
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
