import React from 'react'
import { Route } from 'react-router-dom'
import loadable from 'loadable-components'

import Loading from '../components/loading'

const BlogList = loadable(() => import('../view/blogList'), {
  fallback: Loading,
})

const BlogDetail = loadable(() => import('../view/blogDetail'), {
  fallback: Loading,
})

export default () => (
  <div>
    <Route path="/" exact component={BlogList} key="blogList" />
    <Route path="/detail" component={BlogDetail} key="detail" />
  </div>
)
