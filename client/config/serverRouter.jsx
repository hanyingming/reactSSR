import React from 'react'
import { Route, Switch } from 'react-router-dom'
import loadable from 'loadable-components'

import Loading from '../components/loading'

const BlogList = loadable(() => import('../view/blogList'), {
  fallback: Loading,
})

const BlogDetail = loadable(() => import('../view/blogDetail'), {
  fallback: Loading,
})

export default () => (
  <Switch>
    <Route path="/" exact component={BlogList} />
    <Route path="/detail" component={BlogDetail} />
  </Switch>
)
