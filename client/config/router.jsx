import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import BlogDetail from '../view/blogDetail'
import BlogList from '../view/blogList'

export default () => (
  <Router>
    <Switch>
      <Route path="/" exact component={BlogList} />
      <Route path="/detail" component={BlogDetail} />
    </Switch>
  </Router>
)
