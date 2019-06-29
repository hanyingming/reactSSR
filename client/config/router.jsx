import React from 'react'
import path from 'path'
// import { Route } from 'react-router-dom'
import { Switch, Redirect } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import loadable from '@loadable/component'
// import Loading from '../components/loading'

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

// const loadBlogList = loadable({
//   loader: () => import('../view/blogList'),
//   loading: Loading,
// })
// const loadBlogDetail = loadable({
//   loader: () => import('../view/blogDetail'),
//   loading: Loading,
// });
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

const BlogList = loadable(() => import('../view/blogList'))
const BlogDetail = loadable(() => import('../view/blogDetail'))

export const routes = [
  {
    id: 'blogList',
    path: '/blogList',
    exact: true,
    component: BlogList,
    serverSideRequirePath: path.join(__dirname, '../view/blogList'),
  }, {
    id: 'detail',
    path: '/detail',
    exact: true,
    component: BlogDetail,
    serverSideRequirePath: path.join(__dirname, '../view/blogDetail'),
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
