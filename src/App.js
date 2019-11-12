import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import store from "../src/store/";
import Login from "./view/login/";
import NewUser from "./view/newUser/";
import Home from "./view/home/";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/newuser" component={NewUser} />
        <Route exact path="/login" component={Login} />
      </Router>
    </Provider>
  );
}

export default App;