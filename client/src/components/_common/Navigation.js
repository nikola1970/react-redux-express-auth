import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

class Navigation extends React.Component {
    render() {
        const { isAuthenticated } = this.props.auth;

        const guestNav = (
            <nav>
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/register">Register</NavLink>
                <NavLink to="/login">Login</NavLink>
            </nav>
        );

        const userNav = (
            <nav>
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/mytodos">My Todos</NavLink>
                <NavLink to="/addtodo">Add todo</NavLink>
                <NavLink to="/logout">Logout</NavLink>
            </nav>
        );

        return <div className="main-nav">{isAuthenticated ? userNav : guestNav}</div>;
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(Navigation);
