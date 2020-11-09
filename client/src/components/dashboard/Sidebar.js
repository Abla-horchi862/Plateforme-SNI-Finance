import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-wrapper">
          <div className="logo">
            <Link to='/' className="simple-text">
              Finance_SNI
            </Link>
          </div>
          <ul className="nav">
            <li className="nav-item">
              <NavLink className="nav-link" to='/dashboard'>
                <i className="nc-icon nc-chart-pie-35"></i>
                <p>Dashboard</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='/profile'>
                <i className="nc-icon nc-circle-09"></i>
                <p>User Profile</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='/products'>
                <i className="nc-icon nc-bullet-list-67"></i>
                <p>Products</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='/orders'>
                <i className="nc-icon nc-cart-simple"></i>
                <p>Orders</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='/customers'>
                <i className="nc-icon nc-circle-09"></i>
                <p>Customers</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='/employers'>
                <i className="nc-icon nc-circle-09"></i>
                <p>Employers</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='/charges'>
                <i className="nc-icon nc-notes"></i>
                <p>Charges</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='/incidents'>
                <i className="nc-icon nc-bell-55"></i>
                <p>Inicidents Gestion </p>
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    )
  }
}

export default Sidebar