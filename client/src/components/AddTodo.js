import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions/todo";
import { Form } from "semantic-ui-react";

class AddTodo extends React.Component {
    state = {
      name: ""
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.addTodo(this.state.name);
    }

    render(){
      return (
        <Form onSubmit={this.handleSubmit}>
                {/* { loading && <Dimmer active><Loader></Loader></Dimmer> }
                { error && <Message negative><Message.Header>Server error: {error}</Message.Header></Message> } */}

                <Form.Input name="name" value={this.state.name} label="Task" onChange={this.onChange} />
                {/* { username && <Message negative><Message.Header>{ username }</Message.Header></Message> } */}

                <Form.Button>Add</Form.Button>
            </Form>
      );
    }
}

export default connect(null, { addTodo })(AddTodo);