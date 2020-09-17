import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Clock from "./components/Clock";
import Home from "./components/Home";
import Stopwatch from "./components/Stopwatch";
import Timer from "./components/Timer";
import NavBar from "./layout/NavBar";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid">
          <NavBar />
          <div>
            <hr />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/timer">
                <Timer />
              </Route>
              <Route path="/stopwatch">
                <Stopwatch />
              </Route>
              <Route path="/clock">
                <Clock />
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
