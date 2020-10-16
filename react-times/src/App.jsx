import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Clock from "./components/Clock";
import Home from "./components/Home";
import Stopwatch from "./components/Stopwatch";
import Timer from "./components/Timer";
import NavBar from "./layout/NavBar";
import { BACKGROUND_COLOR } from "./services/colorService";

class App extends Component {
  state = {
    showNavBar: true,
  };

  componentDidMount() {
    document.body.style.backgroundColor = BACKGROUND_COLOR;
  }

  toggleNavBar = () => {
    this.setState({ showNavBar: !this.state.showNavBar });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid">
          {this.state.showNavBar ? <NavBar /> : null}
          <div className="d-flex align-items-center" style={{ height: "75vh" }}>
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
                <Clock toggleNavBar={this.toggleNavBar} />
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
