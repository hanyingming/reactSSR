import React from 'react';
import AppRouter from '../config/router'
import Header from '../components/header'
import Footer from '../components/footer'
import SideMenu from '../components/sideMenu'

export default class App extends React.Component {
  // handleListener = () => {
  //   console.warn(33333)
  // }

  componentWillMount() {
    // console.warn(222);
  }

  componentDidMount() {
    // console.warn(33323);
  }

  render() {
    return [
      <div style={{ width: '100%', height: '100vh' }}>
        <div style={{ width: '100%', height: '60px' }}>
          <Header />
        </div>
        <div style={{ display: 'flex', height: '600px' }}>
          <div style={{ width: '200px' }}>
            <SideMenu />
          </div>
        </div>
        <div style={{ height: '80px' }}>
          <Footer />
        </div>
      </div>,
      <AppRouter />,
    ]
  }
}
