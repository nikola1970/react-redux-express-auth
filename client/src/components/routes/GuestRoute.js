import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route {...rest} render={ props => !isAuthenticated ? <Component {...props} /> : <Redirect to="/" /> } />
);

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps)(GuestRoute);