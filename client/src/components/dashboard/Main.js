import React, { Component } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Switch, Route, Redirect } from 'react-router-dom'
import Dashboard from './Dashboardk'
import UserProfile from './UserProfile'
import Products from "../Products/Products"
import Orders from "../Orders/Orders"
import Customers from "../Customers/Customers"
import Employers from "../Employers/Employers"
import Incidents from "../Incidents/Incidents"
import Charges from "../Chargers/Charges"

class Main extends Component {
  render() {
    return (
      <div className="main-panel">
        <Navbar />
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/products" component={Products} />
          <Route path="/orders" component={Orders} />
          <Route path="/customers" component={Customers} />
          <Route path="/employers" component={Employers} />
          <Route path="/charges" component={Charges} />
          <Route path="/incidents" component={Incidents} />
          <Redirect from='*' to='/dashboard' />
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default Main