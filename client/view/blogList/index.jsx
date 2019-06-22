import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getData } from '../../store/action'

class BlogList extends React.Component {
  componentDidMount() {
    // do something here
    const { dispatch, getData1 } = this.props;
    getData1(dispatch);
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
