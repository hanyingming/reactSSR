import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'

// import AppRouter from './config/router'
import App, { routes } from './view/App'
import stores from './store'

// export default (store, routerContext, url) => (
//   <Provider store={store}>
//     <StaticRouter context={routerContext} location={url}>
//       <AppRouter />
//     </StaticRouter>
//   </Provider>
// )

export default (store, routerContext, url) => (
  <Provider store={store}>
    <StaticRouter context={routerContext} location={url}>
      <App />
    </StaticRouter>
  </Provider>
)

export { routes, stores }
