import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import store from "../src/store/";
import Login from "./view/login/";
import NewUser from "./view/newUser/";
import Home from "./view/home/";
import RecoverPassword from "./view/recoverPassword/";
import NewEvent from "./view/newEvents/";
import EventsDetail from "./view/eventDetail/";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/my-event/:params" component={Home} />
        <Route exact path="/newuser" component={NewUser} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/recover-password" component={RecoverPassword} />
        <Route exact path="/new-event" component={NewEvent} />
        <Route path="/event-detail/:id" component={EventsDetail} />
      </Router>
    </Provider>
  );
}

export default App;
