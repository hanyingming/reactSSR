import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
import { init } from '@rematch/core'

import App, { routes } from './view/App'
import stores from './store'
// import { blog, app } from './model'
import * as models from './model'

export default (routerContext, url, modules) => {
  const Store = init({
    models,
    redux: {},
  })
  return (
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <Provider store={Store}>
        <StaticRouter context={routerContext} location={url}>
          <App />
        </StaticRouter>
      </Provider>
    </Loadable.Capture>
  )
}

const preloadAll = () => Loadable.preloadAll

export {
  routes,
  stores,
  models,
  preloadAll,
}
