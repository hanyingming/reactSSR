import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getData } from '../../store/action'

export default class BlogList extends React.Component {
  componentDidMount() {
    // do something here
    const { dispatch, store } = this.props;
    getData(dispatch, store.getState);
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
  store: PropTypes.shape({ getState: PropTypes.func.isRequired }).isRequired,
}
