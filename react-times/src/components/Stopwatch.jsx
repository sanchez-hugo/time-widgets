import React, { Component } from "react";
import {
  convertMilsecondsToTime,
  getTimeStringV2,
} from "../services/timeService";

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {
        hour: 0,
        minute: 0,
        second: 0,
        milsecond: 0,
      },
      status: {
        isPaused: false,
        hasStarted: false,
      },
      elapsedMilseconds: 0,
      stopwatchId: 0,
      splits: [],
      mappedSplits: [],
    };
  }

  componentWillUnmount() {
    clearInterval(this.state.stopwatchId);
  }

  //#region Stopwatch
  startStopwatch = () => {
    const stopwatchId = setInterval(this.updateStopwatch, 10);

    this.setStopwatchId(stopwatchId);
  };

  updateStopwatch = () => {
    const { elapsedMilseconds } = this.state;
    this.setElapsedMilseconds(elapsedMilseconds + 10);
    const time = convertMilsecondsToTime(elapsedMilseconds + 10);
    this.setTime(time);
  };

  splitStopwatch = () => {
    const { elapsedMilseconds, splits } = this.state;
    const splitString = getTimeStringV2(elapsedMilseconds);
    splits.push(splitString);

    const mappedSplits = splits.map(this.mapSplit);

    this.setSplits(splits, mappedSplits);
  };

  pauseStopwatch = () => {
    clearInterval(this.state.stopwatchId);
    this.setIsPaused(true);
  };

  resumeStopwatch = () => {
    this.setIsPaused(false);
    this.startStopwatch();
  };

  stopStopwatch = () => {
    clearInterval(this.state.stopwatchId);
    this.resetState();
  };

  mapSplit = (split, index) => {
    return (
      <li key={index + 1} className="list-group-item bg-dark">
        {split}
      </li>
    );
  };

  //#endregion

  //#region Event Handlers
  onStartClick = () => {
    this.setHasStarted(true);
    this.startStopwatch();
  };

  onSplitClick = () => {
    this.splitStopwatch();
  };

  onPauseClick = () => {
    if (this.state.status.isPaused) this.resumeStopwatch();
    else this.pauseStopwatch();
  };

  onStopClick = () => {
    this.stopStopwatch();
  };
  //#endregion

  //#region State
  setTime = (time) => {
    this.setState((prevState) => ({ ...prevState, time }));
  };

  setElapsedMilseconds = (elapsedMilseconds) => {
    this.setState((prevState) => ({ ...prevState, elapsedMilseconds }));
  };

  setStopwatchId = (stopwatchId) => {
    this.setState((prevState) => ({ ...prevState, stopwatchId }));
  };

  setIsPaused = (isPaused) => {
    this.setState((prevState) => ({
      ...prevState,
      status: { ...prevState.status, isPaused },
    }));
  };

  setHasStarted = (hasStarted) => {
    this.setState((prevState) => ({
      ...prevState,
      status: { ...prevState.status, hasStarted },
    }));
  };

  setIsComplete = (isComplete) => {
    this.setState((prevState) => ({
      ...prevState,
      status: { ...prevState.status, isComplete },
    }));
  };

  setSplits = (splits, mappedSplits) => {
    this.setState((prevState) => ({ ...prevState, splits, mappedSplits }));
  };

  resetState = () => {
    const elapsedMilseconds = 0;
    const time = {
      hour: 0,
      minute: 0,
      second: 0,
      milsecond: 0,
    };
    const status = {
      isPaused: false,
      hasStarted: false,
    };
    const splits = [];
    const mappedSplits = [];
    const stopwatchId = 0;

    this.setState((prevState) => ({
      ...prevState,
      elapsedMilseconds,
      time,
      status,
      splits,
      mappedSplits,
      stopwatchId,
    }));
  };
  //#endregion

  render() {
    const { hour, minute, second, milsecond } = this.state.time;

    return (
      <div className="container-fluid p-3">
        <div className="row justify-content-center px-md-5">
          <div className="col-md-6 card bg-dark text-white">
            <div className="card-header text-center">
              <h3 className="card-title font-weight-light">Stopwatch</h3>
            </div>
            <div className="card-body">
              <div className="row justify-content-center">
                {this.state.status.isComplete ? (
                  <div
                    className="alert alert-success w-75 text-center"
                    role="alert"
                  >
                    Time's up!
                  </div>
                ) : null}
              </div>
              <div className="row justify-content-center">
                <div className="col-3 input-group">
                  <input
                    name="hour"
                    type="number"
                    className="form-control bg-secondary text-white"
                    min={0}
                    max={99}
                    placeholder={0}
                    value={hour}
                    disabled
                  />
                </div>
                <div className="col-3 input-group">
                  <input
                    name="minute"
                    type="number"
                    className="form-control bg-secondary text-white"
                    min={0}
                    max={59}
                    placeholder={0}
                    value={minute}
                    disabled
                  />
                </div>
                <div className="col-3 input-group">
                  <input
                    name="second"
                    type="number"
                    className="form-control bg-secondary text-white"
                    min={0}
                    max={59}
                    placeholder={0}
                    value={second}
                    disabled
                  />
                </div>
                <div className="col-3 input-group">
                  <input
                    name="milsecond"
                    type="number"
                    className="form-control bg-secondary text-white"
                    min={0}
                    max={999}
                    placeholder={0}
                    value={milsecond / 10}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row justify-content-center px-3">
                <div className=" btn-group">
                  {this.state.status.hasStarted ? (
                    <button
                      className="btn btn-primary"
                      onClick={this.onSplitClick}
                      //   disabled={this.state.status.isPaused}
                    >
                      Split
                    </button>
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={this.onStartClick}
                      disabled={this.state.status.hasStarted}
                    >
                      Start
                    </button>
                  )}
                  <button
                    className="btn btn-warning"
                    onClick={this.onPauseClick}
                    disabled={!this.state.status.hasStarted}
                  >
                    {this.state.status.isPaused ? "Resume" : "Pause"}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.onStopClick}
                    disabled={!this.state.status.hasStarted}
                  >
                    Stop
                  </button>
                </div>
              </div>
            </div>
            {this.state.mappedSplits.length ? (
              <ul className="list-group list-group-flush">
                {this.state.mappedSplits}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Stopwatch;
