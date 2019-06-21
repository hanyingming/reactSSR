import React from 'react';
import BlogDetail from './blogDetail'
import BlogList from './blogList'

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
    return (
      <div>
        <BlogList />
        <BlogDetail />
        hello world!
      </div>
    );
  }
}
