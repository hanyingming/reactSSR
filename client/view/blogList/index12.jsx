import React from 'react'
// import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default () => {
  const getBlogList = useSelector(state => state.getBlogList)
  return (
    <div>
BlogList,
      {getBlogList.list[0].title}
    </div>
  )
}
