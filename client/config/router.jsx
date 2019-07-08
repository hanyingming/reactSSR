import React from 'react'
// import { Route } from 'react-router-dom'
import { Switch, Redirect } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
// import loadable from '@loadable/component'
import Loadable from 'react-loadable';
import { fetchData } from '../helper'
import Loading from '../components/loading'

// import BlogList from '../view/blogList'
// import BlogDetail from '../view/blogDetail'

// const BlogList = loadable(() => import('../view/blogList'))
// const BlogDetail = loadable(() => import('../view/blogDetail'))

// export const routes = [
//   {
//     path: '/blogList',
//     exact: true,
//     component: loadable(() => import('../view/blogList'), { ssr: false }),
//   }, {
//     path: '/detail',
//     exact: true,
//     component: loadable(() => import('../view/blogDetail'), { ssr: false }),
//   },
// ]

// const BlogList = Loadable({
//   loader: () => import('../view/blogList/index.jsx'),
//   loading: Loading,
//   modules: ['../view/blogList/index.jsx'],
//   webpack: () => [require.resolveWeak('../view/blogList/index.jsx')],
// })
// const BlogDetail = Loadable({
//   loader: () => import('../view/blogDetail/index.jsx'),
//   loading: Loading,
//   modules: ['../view/blogDetail/index.jsx'],
//   webpack: () => [require.resolveWeak('../view/blogDetail/index.jsx')],
// });

const BlogList = Loadable({
  loader: () => import('../view/blogList'),
  loading: Loading,
})
const BlogDetail = Loadable({
  loader: () => import('../view/blogDetail'),
  loading: Loading,
});
// const blogListComponent = () =>
// import('../view/blogList').then(res => [res, res.default.fetchData])

// const loadBlogList = loadable(() => import('../view/blogList').then((res) => {
//   console.warn('blogList.......')
//   console.warn('res', res.default.fetchData)
//   return res.default
// }))

// const loadBlogList = loadable(() => import('../view/blogList').then((res) => {
//   console.warn('blogList.......')
//   console.warn('res', res.default.fetchData)
//   return res.default
// }))

// const BlogList = loadable(() => import('../view/blogList'))
// const BlogDetail = loadable(() => import('../view/blogDetail'))

export const routes = [
  {
    path: '/blogList',
    exact: true,
    component: BlogList,
    fetchData: (store, location) => {
      console.warn('store:', store)
      console.warn('location', location)
      return fetchData(store.dispatch)
    },
  }, {
    path: '/detail',
    exact: true,
    component: BlogDetail,
    fetchData: (store, location) => {
      console.warn('store:', store)
      console.warn('location', location)
      return fetchData(store.dispatch)
    },
  },
]

// export const routes = [
//   {
//     path: '/blogList',
//     exact: true,
//     component: BlogList,
//   }, {
//     path: '/detail',
//     exact: true,
//     component: BlogDetail,
//   },
// ]

// export default () => (
//   <div>
//     <Route path="/" exact component={BlogList} key="blogList" />
//     <Route path="/detail" component={BlogDetail} key="detail" />
//   </div>
// )

export default () => (
  <Switch>
    <Redirect exact from="/" to="/blogList" />
    {renderRoutes(routes)}
  </Switch>
)
