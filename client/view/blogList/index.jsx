import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getData } from '../../store/action'

class BlogList extends React.Component {
  constructor(props) {
    super(props)
    console.warn('调用constructor')
    console.warn('blogList:', this.props.state)
    this.state = {
      counter: 0,
    }
  }

  componentWillMount() {
    console.warn('willMount')
  }

  componentDidMount() {
    // do something here
    console.warn('componetn')
    const { dispatch, getData1 } = this.props;
    // getData1(dispatch);
    console.warn('getData1:', getData1, dispatch)
  }

  // bootstrap() {
  //   console.warn('fetchData')
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       this.counter = 3
  //       resolve(true)
  //     })
  //   })
  // }

  render() {
    const { counter } = this.state
    const { state } = this.props
    const { getBlogList } = state
    const { list } = getBlogList
    console.warn('list: ', list)
    return (
      <div>
        BlogList
        {counter}
        <Link to="/detail">
          {' '}
blogDetail
          {list && list.length > 0 && list[0].title}
          {' '}

        </Link>
      </div>
    )
  }
}

BlogList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getData1: PropTypes.func.isRequired,
  // state: PropTypes.func.isRequired,
  state: PropTypes.shape({ getBlogList: PropTypes.object.isRequired }).isRequired,
}

const mapStateToProps = state => ({ state })

const mapDispatchToProps = dispatch => ({
  dispatch,
  getData1: getData,
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)
