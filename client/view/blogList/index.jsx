import React from 'react'
import { Link } from 'react-router-dom'

export default class BlogList extends React.Component {
  componentDidMount() {
    // do something here
  }

  render() {
    return (
      <div>
        BlogList
        <Link to="/detail"> blogDetail </Link>
      </div>
    )
  }
}
