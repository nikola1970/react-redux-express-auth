import React from "react";
import { Form, Message, Dimmer, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import { login } from "../actions/auth";

class Login extends React.Component {
    state = {
        username: "",
        password: "",
        clientErrors: {}
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    handleSubmit = e => {
        e.preventDefault();
        let errors = {};
        const { username, password } = this.state;
        if (!username.trim().length) errors.username = "Username cannot be blank";
        if (!password.trim().length) errors.password = "Password cannot be blank";

        if (Object.keys(errors).length) {
            this.setState({ clientErrors: errors });
        } else {
            this.props.login({ username, password }, this.props.history);
        }
    }

    render() {

        const { username, password } = this.state.clientErrors;
        const { loading, error } = this.props;

        return (
            <Form onSubmit={this.handleSubmit}>
                { loading && <Dimmer active><Loader></Loader></Dimmer> }
                { error && <Message negative><Message.Header>Server error: {error}</Message.Header></Message> }

                <Form.Input name="username" value={this.state.username} label="Username" onChange={this.onChange} />
                { username && <Message negative><Message.Header>{ username }</Message.Header></Message> }

                <Form.Input name="password" type="password" value={this.state.password} label="password" onChange={this.onChange} />
                { password && <Message negative><Message.Header>{ password }</Message.Header></Message> }

                <Form.Button>Login</Form.Button>
            </Form>
        );
    }
}


function mapStateToProps(state) {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    };
}

export default connect(mapStateToProps, { login })(Login);


