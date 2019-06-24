import React from 'react'
import { StaticRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

// import store from './store'
import App from './view/App'

export default (store, routerContext, url) => (
  <Provider store={store}>
    <Router context={routerContext} location={url}>
      <App />
    </Router>
  </Provider>
)
