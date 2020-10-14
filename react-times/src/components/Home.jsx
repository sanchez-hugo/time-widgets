import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div className="d-flex align-items-center" style={{height: "75vh"}}>
        <div className="container-fluid text-white">
          <div className="text-center font-weight-light h4">
            A simple{" "}
            <a className="text-info" href="/timer">
              Timer
            </a>
            ,{" "}
            <a className="text-info" href="/stopwatch">
              Stopwatch
            </a>
            , and{" "}
            <a className="text-info" href="/Clock">
              Clock
            </a>
            .
          </div>
          <div className="text-center font-weight-light h5">
            Built with React.js and styled with Bootstrap.
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
