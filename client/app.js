import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
// import { loadableReady } from '@loadable/component'
import Loadable from 'react-loadable'
import { init } from '@rematch/core'

// import store from './store'
import App from './view/App'
import * as models from './model'

console.warn('models:', models)

const defaultState = (global && global.context && global.context.INITIAL_STATE)
  || {}

const Store = init({
  models,
  redux: defaultState,
})

const render = (Component) => {
  Loadable.preloadReady().then(() => {
    ReactDom.hydrate(
      <Provider store={Store}>
        <AppContainer>
          <BrowserRouter>
            <Component />
          </BrowserRouter>
        </AppContainer>
      </Provider>,
      document.getElementById('root'),
    )
  })
};

render(App);
// 局部刷新  HMR
if (module.hot) {
  module.hot.accept('./view/App', () => {
    const NextApp = require('./view/App').default;
    render(NextApp);
  });
}
