import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// import { getData } from '../../store/action'
// @connect(state => ({
//   getBlogList: state.getBlogList,
// }))
class BlogList extends React.Component {
  constructor(props) {
    super(props)
    // do something here
    // console.warn(Object.keys(this.props))
    // this.state = {
    //   counter: 0,
    // }
  }

  componentWillMount() {
    console.warn('willMount')
  }

  componentDidMount() {
    // do something here
    console.warn('componetn')
    // const { dispatch, getData1 } = this.props;
    // getData1(dispatch);
    // console.warn('getData1:', getData1, dispatch)
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
    // const { counter } = this.state
    const { getBlogList } = this.props
    // const { getBlogList } = state
    // const { list } = getBlogList
    // console.warn('list: ', list)
    console.warn('getBlogList:', getBlogList)
    return (
      <div>
        BlogList b 123fetchData123qw1
        <Link to="/detail">
blogDetail
        </Link>
      </div>
    )
  }
}

// BlogList.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   getData1: PropTypes.func.isRequired,
//   // state: PropTypes.func.isRequired,
//   state: PropTypes.shape({ getBlogList: PropTypes.object.isRequired }).isRequired,
// }

// const mapStateToProps = state => ({
//   getBlogList: state.getBlogList,
// })
// const mapDispatchToProps = dispatch => ({
//   dispatch,
//   getData1: getData,
// })

// export default connect(mapStateToProps, mapDispatchToProps)(BlogList)
// export default connect(state => ({
//   getBlogList: state.getBlogList,
// }))(BlogList)

export default BlogList
