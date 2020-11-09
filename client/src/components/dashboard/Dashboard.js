import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";



import { BrowserRouter as Router, Route } from 'react-router-dom'

import RealDash from "./RealDash"

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
render() {
    const { user } = this.props.auth;
return (
  <div>

        <div className="wrapper">
                <Router>
                  
                  <Route path='/' component={RealDash} />
                </Router>
          </div>

    <div  className="container center">
        <div>
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into our financial platofrm</p>
            </h4>
            
            
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
                alignItems: "center",
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large btn-flat waves-effect white black-text">Logout</button>
          
        </div>
       
      </div>

  </div>
      
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);