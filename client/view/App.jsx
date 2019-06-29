import React from 'react';
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'

import AppRouter, { routes } from '../config/router'
import Header from '../components/header'
import Footer from '../components/footer'
import SideMenu from '../components/sideMenu'

export { routes }
class App extends React.Component {
  // handleListener = () => {
  //   console.warn(33333)
  // }

  constructor(props) {
    super(props)
    console.warn('App -> constructor')
  }

  componentWillMount() {
    // console.warn(222);
    // console.warn(this.props.dispatch)
  }

  componentDidMount() {
    // console.warn(33323);
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <div style={{ width: '100%', height: '60px' }}>
          <Header />
        </div>
        <div style={{ display: 'flex', height: '600px' }}>
          <div style={{ width: '200px' }}>
            <SideMenu />
          </div>
          <div>
            <AppRouter />
          </div>
        </div>
        <div style={{ height: '80px' }}>
          <Footer />
        </div>
      </div>
    )
  }
}

export default App
