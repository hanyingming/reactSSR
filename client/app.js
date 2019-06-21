import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import App from './view/App'


const render = (Component) => {
  ReactDom.hydrate(
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
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
