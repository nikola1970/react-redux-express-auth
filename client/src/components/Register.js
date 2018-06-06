import React from "react";
import { Form, Message, Dimmer, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import { register } from "../actions/auth";

class Register extends React.Component {

    state = {
        username: "",
        password: "",
        repeat_password: "",
        email: "",
        clientErrors: {}
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    handleSubmit = (e) => {
        e.preventDefault();

        let errors = {};
        const { username, password, repeat_password, email } = this.state;

        if (!username.trim()) errors.username = "Username cannot be blank";
        if (!password.trim()) errors.password = "Password cannot be blank";
        if (password !== repeat_password) errors.repeat_password = "Password do not match";
        if (!email.trim()) errors.email = "Email cannot be blank";

        if (Object.keys(errors).length) {
            this.setState({ clientErrors: errors });
        } else {
            this.props.register({ username, password, email }, this.props.history);
        }
    };

    render() {

        const { username, password, repeat_password, email } = this.state.clientErrors;
        const { loading, error } = this.props;

        return (
            <Form onSubmit={this.handleSubmit}>
                { error && <Message negative><Message.Header>Server error: {error.message}</Message.Header></Message> }

                { loading && <Dimmer active><Loader></Loader></Dimmer> }

                <Form.Input name="username" value={this.state.username} label="Username" onChange={this.onChange} />
                { username && <Message negative><Message.Header>{ username }</Message.Header></Message> }

                <Form.Input name="email" value={this.state.email} label="Email" type="email" onChange={this.onChange} />
                { email && <Message negative><Message.Header>{ email }</Message.Header></Message> }

                <Form.Input name="password" value={this.state.password} label="Password" type="password" onChange={this.onChange} />
                { password && <Message negative><Message.Header>{ password }</Message.Header></Message> }

                <Form.Input name="repeat_password" value={this.state.repeat_password} label="Repeat password" type="password" onChange={this.onChange} />
                { repeat_password && <Message negative><Message.Header>{ repeat_password }</Message.Header></Message> }
                <Form.Button>Register</Form.Button>
            </Form>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}


export default connect(mapStateToProps, { register })(Register);



