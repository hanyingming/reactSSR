import React from 'react'
import loadable from 'loadable-components'

import Loading from '../components/loading'

export default [
  {
    path: '/',
    component: loadable(() => import('../view/blogDetail'), {
      fallback: Loading,
    }),
    fetchData: () => new Promise((resolve) => {
      setTimeout(() => {
        console.warn('fetchData')
        resolve(true)
      })
    })
  }, {
    path: '/detail',
    component: loadable(() => import('../view/blogList'), {
      fallback: Loading,
    })
  },
];
