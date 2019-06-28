import React from 'react'
import PropTypes from 'prop-types'
// import bootstrapper from 'react-async-bootstrapper'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getData } from '../../store/action'

class BlogList extends React.Component {
  static fetchData() {
    console.warn('fetchData')
    return new Promise((resolve) => {
      setTimeout(() => {
        this.counter = 1
        resolve(true)
      })
    })
  }

  constructor(props) {
    super(props)
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
    getData1(dispatch);
  }

  bootstrap() {
    console.warn('bootStrap')
    return new Promise((resolve) => {
      setTimeout(() => {
        this.counter = 1
        resolve(true)
      })
    })
  }

  render() {
    const { counter } = this.state
    return (
      <div>
        BlogList
        {counter}
        <Link to="/detail"> blogDetail </Link>
      </div>
    )
  }
}

BlogList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getData1: PropTypes.func.isRequired,
  // store: PropTypes.shape({ getState: PropTypes.func.isRequired }).isRequired,
}

const mapStateToProps = state => ({ state })

const mapDispatchToProps = dispatch => ({
  dispatch,
  getData1: getData,
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)
