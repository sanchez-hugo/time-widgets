import React, { Component } from "react";
import {
  convertSecondsToTime,
  getTimeString,
} from "../services/utilityService";

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elapsedSeconds: 0,
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
      splits: [],
      mappedSplits: [],
      stopwatchId: 0,
      milsecond: {
        intervalId: 0,
        current: 0,
      },
    };
  }

  //#region Stopwatch
  startStopwatch = () => {
    const milsecondId = setInterval(this.updateMilSecond, 10);
    const stopwatchId = setInterval(this.updateStopwatch, 1000);

    const { milsecond } = this.state;
    milsecond.intervalId = milsecondId;

    this.setStopwatchId(stopwatchId);
    this.setState((prevState) => ({ ...prevState, milsecond }));
  };

  updateMilSecond = () => {
    const { milsecond } = this.state;

    if (milsecond.current >= 99) milsecond.current = 0;
    else milsecond.current += 1;

    this.setState(
      (prevState) => ({ ...prevState, milsecond }),
      () => {
        if (milsecond.current === 0)
          console.log(milsecond.current, this.state.time);
      }
    );
  };

  updateStopwatch = () => {
    const { elapsedSeconds } = this.state;
    this.setElapsedSeconds(elapsedSeconds + 1);
    const time = convertSecondsToTime(elapsedSeconds + 1);
    this.setTime(time);
  };

  splitStopwatch = () => {
    const { elapsedSeconds, splits } = this.state;
    const splitString = getTimeString(elapsedSeconds);
    splits.push(splitString);

    const mappedSplits = splits.map(this.mapSplit);

    this.setSplits(splits, mappedSplits);
  };

  pauseStopwatch = () => {
    clearInterval(this.state.stopwatchId);
    clearInterval(this.state.milsecond.intervalId);
    this.setIsPaused(true);
  };

  resumeStopwatch = () => {
    this.setIsPaused(false);
    this.startStopwatch();
  };

  stopStopwatch = () => {
    clearInterval(this.state.stopwatchId);
    clearInterval(this.state.milsecond.intervalId);
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

  setElapsedSeconds = (elapsedSeconds) => {
    this.setState((prevState) => ({ ...prevState, elapsedSeconds }));
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
    const elapsedSeconds = 0;
    const time = {
      hour: 0,
      minute: 0,
      second: 0,
    };
    const status = {
      isPaused: false,
      hasStarted: false,
    };
    const splits = [];
    const mappedSplits = [];
    const stopwatchId = 0;
    const milsecond = {
      intervalId: 0,
      current: 0,
    };

    this.setState((prevState) => ({
      ...prevState,
      elapsedSeconds,
      time,
      status,
      splits,
      mappedSplits,
      stopwatchId,
      milsecond,
    }));
  };
  //#endregion

  render() {
    const { hour, minute, second } = this.state.time;
    const milsecond = this.state.milsecond.current;

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
                    value={milsecond}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row justify-content-center px-3">
                <div className=" btn-group">
                  <button
                    className="btn btn-secondary"
                    onClick={this.onStartClick}
                    disabled={this.state.status.hasStarted}
                  >
                    Start
                  </button>
                  {this.state.status.hasStarted ? (
                    <button
                      className="btn btn-secondary"
                      onClick={this.onSplitClick}
                      //   disabled={this.state.status.isPaused}
                    >
                      Split
                    </button>
                  ) : null}
                  <button
                    className="btn btn-secondary"
                    onClick={this.onPauseClick}
                    disabled={!this.state.status.hasStarted}
                  >
                    {this.state.status.isPaused ? "Resume" : "Pause"}
                  </button>
                  <button
                    className="btn btn-secondary"
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
