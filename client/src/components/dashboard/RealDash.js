import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Sidebar from './Sidebar'
import Main from './Main'
import '../assets/css/bootstrap.min.css'
import '../assets/css/light-bootstrap-dashboard.css'
import '../assets/css/dashboard.css'

class RealDash extends Component {
  render() {
    return (
      <div className="wrapper">
        <Router>
          <Sidebar />
          <Route path='/' component={Main} />
        </Router>
      </div>
    )
  }
}

export default RealDash