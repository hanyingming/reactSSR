import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'
import App from './view/App'

export default () => (
  <Provider store={store}>
    <StaticRouter>
      <App />
    </StaticRouter>
  </Provider>
)
