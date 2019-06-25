import React from 'react'
import { Switch, Route } from 'react-router-dom'
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
    <Route path="/" exact component={BlogList} key="blogList" />
    <Route path="/detail" component={BlogDetail} key="detail" />
  </Switch>
)
