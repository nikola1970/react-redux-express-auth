import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import PersonalTodos from "./components/PersonalTodos";
import AddTodo from "./components/AddTodo";
import Navigation from "./components/_common/Navigation";
import Logout from "./components/_common/Logout";
import AuthRoute from "./components/routes/AuthRoute";
import GuestRoute from "./components/routes/GuestRoute";

class App extends Component {

  render() {
      
    return (
        [
            <Navigation key="navigation" />,
            <div key="main-layout" className="container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <AuthRoute exact path="/mytodos" component={PersonalTodos} />
                    <AuthRoute exact path="/addtodo" component={AddTodo} />
                    <GuestRoute exact path="/register" component={Register} />
                    <GuestRoute exact path="/login" component={Login} />
                    <AuthRoute exact path="/logout" component={Logout} />
                </Switch>
            </div>
        ]
    );
  }
}

export default App;
