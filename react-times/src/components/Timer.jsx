import React, { Component } from "react";
import {
  convertTimeToSeconds,
  convertSecondsToTime,
} from "../services/timeService";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {
        hour: 0,
        minute: 2,
        second: 0,
      },
      startTime: {
        hour: 0,
        minute: 2,
        second: 0,
      },
      status: {
        isPaused: false,
        hasStarted: false,
        isComplete: false,
      },
      remaindingSeconds: 120,
      timerId: 0,
      touch: {
        hour: 0,
        minute: 0,
        second: 0,
      },
    };
  }

  componentWillUnmount() {
    clearInterval(this.state.timerId);
  }

  //#region Timer
  /* Start */
  startTimer = (remaindingSeconds) => {
    this.setState(
      (prevState) => ({ ...prevState, remaindingSeconds }),
      () => {
        const timerId = setInterval(this.updateTimer, 1000);
        this.setTimerId(timerId);
      }
    );
  };

  /* Update */
  updateTimer = () => {
    const { remaindingSeconds } = this.state;
    if (remaindingSeconds > 0) {
      const time = convertSecondsToTime(remaindingSeconds);
      this.setTime(time);
      this.setRemainingSeconds(remaindingSeconds - 1);
    } else {
      this.resetTimer();
      this.setIsComplete(true);
    }
  };

  addTime = (addedSeconds) => {
    const { remaindingSeconds } = this.state;
    if (remaindingSeconds > 0) {
      let totalSeconds = remaindingSeconds + addedSeconds;
      const time = convertSecondsToTime(totalSeconds);
      this.setTime(time);
      if (this.state.status.hasStarted) totalSeconds--;
      this.setRemainingSeconds(totalSeconds);
    }
  };

  /* Pause */
  pauseTimer = () => {
    clearInterval(this.state.timerId);
    this.setIsPaused(true);
  };

  resumeTimer = () => {
    this.setIsPaused(false);
    this.startTimer(this.state.remaindingSeconds);
  };

  /* Reset */

  resetTimer = () => {
    clearInterval(this.state.timerId);
    this.resetState();
  };
  //#endregion

  //#region Event Handlers
  onInputChange = (e) => {
    const event = e;
    const { name, value } = event.target;

    if (!this.state.status.hasStarted) {
      const time = { ...this.state.time };
      time[name] = Number(value);
      const remaindingSeconds = convertTimeToSeconds(time);

      this.setTime(time);
      this.setRemainingSeconds(remaindingSeconds);
    }
  };

  onStartClick = () => {
    const { time } = this.state;
    const remaindingSeconds = convertTimeToSeconds(time);

    if (remaindingSeconds > 0) {
      const status = { ...this.state.status };
      status.isComplete = false;
      status.hasStarted = true;

      this.setStatus(status);
      this.setStartTime(time);
      this.startTimer(remaindingSeconds - 1);
    }
  };

  onPauseClick = () => {
    if (this.state.status.isPaused) this.resumeTimer();
    else this.pauseTimer();
  };

  onAddTimeClick = (e) => {
    const event = e;
    const { value } = event.target;
    const addedSeconds = Number(value);

    this.addTime(addedSeconds);
  };

  onResetClick = () => {
    this.resetTimer();
  };

  onWheelEvent = () => {
    // Allows for wheel to control number input
  };

  onTouchMove = (e) => {
    const event = e;

    if (this.state.status.hasStarted) return;

    const { name } = event.target;
    const { clientY } = event.changedTouches[0];

    const currentY = this.state.touch[name];

    if (currentY !== 0) {
      const time = { ...this.state.time };

      if (clientY < currentY) time[name] = time[name] + 1;
      else time[name] = time[name] - 1;

      if (time[name] < 0) time[name] = 0;

      this.setTime(time);
    }

    this.setY(name, clientY);
  };
  //#endregion

  //#region State
  setTime = (time) => {
    this.setState((prevState) => ({ ...prevState, time }));
  };

  setStartTime = (startTime) => {
    this.setState((prevState) => ({ ...prevState, startTime }));
  };

  setRemainingSeconds = (remaindingSeconds) => {
    this.setState((prevState) => ({ ...prevState, remaindingSeconds }));
  };

  setTimerId = (timerId) => {
    this.setState((prevState) => ({ ...prevState, timerId }));
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

  setStatus = (status) => {
    this.setState((prevState) => ({
      ...prevState,
      status,
    }));
  };

  setY = (name, value) => {
    const touch = this.state.touch;
    touch[name] = value;

    this.setState((prevState) => ({ ...prevState, touch }));
  };

  resetState = () => {
    const time = this.state.startTime;
    const remaindingSeconds = this.state.remaindingSeconds;
    const timerId = 0;
    const status = {
      isPaused: false,
      hasStarted: false,
      isComplete: false,
    };

    this.setState((prevState) => ({
      ...prevState,
      time,
      remaindingSeconds,
      timerId,
      status,
    }));
  };
  //#endregion

  render() {
    const { hour, minute, second } = this.state.time;

    return (
      <div className="container-fluid p-3">
        <div className="row justify-content-center px-md-5">
          <div className="col-md-6 card bg-dark text-white">
            <div className="card-header text-center">
              <h3 className="card-title font-weight-light">Timer</h3>
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
                <div className="col-4 input-group">
                  <input
                    name="hour"
                    type="number"
                    className="form-control bg-secondary text-white"
                    min={0}
                    max={99}
                    placeholder={hour}
                    value={hour}
                    onChange={this.onInputChange}
                    onTouchMove={this.onTouchMove}
                    onWheel={this.onWheelEvent}
                    disabled={this.state.status.hasStarted}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">hr</span>
                  </div>
                </div>
                <div className="col-4 input-group">
                  <input
                    name="minute"
                    type="number"
                    className="form-control bg-secondary text-white"
                    min={0}
                    max={59}
                    placeholder={minute}
                    value={minute}
                    onChange={this.onInputChange}
                    onTouchMove={this.onTouchMove}
                    onWheel={this.onWheelEvent}
                    disabled={this.state.status.hasStarted}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">m</span>
                  </div>
                </div>
                <div className="col-4 input-group">
                  <input
                    name="second"
                    type="number"
                    className="form-control bg-secondary text-white"
                    min={0}
                    max={59}
                    placeholder={second}
                    value={second}
                    onChange={this.onInputChange}
                    onTouchMove={this.onTouchMove}
                    onWheel={this.onWheelEvent}
                    disabled={this.state.status.hasStarted}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">s</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row justify-content-center px-3">
                <div className="col-sm-12 col-md-10 row justify-content-between">
                  <data
                    value="10"
                    className="badge btn btn-small btn-link badge-pill badge-info m-1"
                    onClick={this.onAddTimeClick}
                  >
                    + 10 sec
                  </data>
                  <data
                    value="30"
                    className="badge btn btn-small btn-link badge-pill badge-info m-1"
                    onClick={this.onAddTimeClick}
                  >
                    + 30 sec
                  </data>
                  <data
                    value="60"
                    className="badge btn btn-small btn-link badge-pill badge-info m-1"
                    onClick={this.onAddTimeClick}
                  >
                    + 1 min
                  </data>
                  <data
                    value="120"
                    className="badge btn btn-small btn-link badge-pill badge-info m-1"
                    onClick={this.onAddTimeClick}
                  >
                    + 2 min
                  </data>
                  <data
                    value="300"
                    className="badge btn btn-small btn-link badge-pill badge-info m-1"
                    onClick={this.onAddTimeClick}
                  >
                    + 5 min
                  </data>
                  <data
                    value="600"
                    className="badge btn btn-small btn-link badge-pill badge-info m-1"
                    onClick={this.onAddTimeClick}
                  >
                    + 10 min
                  </data>
                  <data
                    value="1800"
                    className="badge btn btn-small btn-link badge-pill badge-info m-1"
                    onClick={this.onAddTimeClick}
                  >
                    + 30 min
                  </data>
                  <data
                    value="3600"
                    className="badge btn btn-small btn-link badge-pill badge-info m-1"
                    onClick={this.onAddTimeClick}
                  >
                    + 1 hr
                  </data>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row justify-content-center px-3">
                <div className=" btn-group">
                  <button
                    className="btn btn-success"
                    onClick={this.onStartClick}
                    disabled={this.state.status.hasStarted}
                  >
                    Start
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={this.onPauseClick}
                    disabled={!this.state.status.hasStarted}
                  >
                    {this.state.status.isPaused ? "Resume" : "Pause"}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.onResetClick}
                    disabled={!this.state.status.hasStarted}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Timer;
