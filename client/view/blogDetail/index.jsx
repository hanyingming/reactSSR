import React from 'react'

export default class BlogDetail extends React.Component {
  componentWillMount() {
    // do something here
    // const a = 1
    console.warn('blogDetail -> willMount')
  }

  componentDidMount() {
    // do something here
    // const a = 1
  }

  render() {
    return (
      <div> blog detail page</div>
    )
  }
}
