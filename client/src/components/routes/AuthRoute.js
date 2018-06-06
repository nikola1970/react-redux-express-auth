import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const AuthRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route {...rest} render={ props => isAuthenticated ? <Component {...props} /> : <Redirect to="/login" /> } />
);

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps)(AuthRoute); 