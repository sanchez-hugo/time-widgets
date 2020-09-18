import React, { Component } from "react";

const SECONDS_IN_HOURS = 60 * 60;
const SECONDS_IN_MINUTES = 60;

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

  //#region Timer
  /* Start */
  onStartClick = () => {
    const { time } = this.state;
    const remaindingSeconds = this.convertTimeToSeconds(time);

    if (remaindingSeconds > 0) {
      this.setStartTime(time);
      this.setIsComplete(false);
      this.setHasStarted(true);
      this.startTimer(remaindingSeconds - 1);
    }
  };

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
  onInputChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    const time = { ...this.state.time };
    time[name] = Number(value);

    this.setTime(time);
  };

  onWheelEvent = () => {
    // Allows for wheel to control number input
  };

  onTouchMove = (e) => {
    const event = e;

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

  updateTimer = () => {
    const { remaindingSeconds } = this.state;
    if (remaindingSeconds > 0) {
      const time = this.convertSecondsToTime(remaindingSeconds);
      this.setTime(time);
      this.setRemainingSeconds(remaindingSeconds - 1);
    } else {
      this.resetTimer();
      this.setIsComplete(true);
    }
  };

  onPauseClick = () => {
    if (this.state.status.isPaused) this.resumeTimer();
    else this.pauseTimer();
  };

  pauseTimer = () => {
    clearInterval(this.state.timerId);
    this.setIsPaused(true);
  };

  resumeTimer = () => {
    this.setIsPaused(false);
    this.startTimer(this.state.remaindingSeconds);
  };

  onAddTimeClick = (e) => {
    const event = e;
    const { value } = event.target;
    const addedSeconds = Number(value);

    this.addTime(addedSeconds);
  };

  addTime = (addedSeconds) => {
    const { remaindingSeconds } = this.state;
    if (remaindingSeconds > 0) {
      let totalSeconds = remaindingSeconds + addedSeconds;
      const time = this.convertSecondsToTime(totalSeconds);
      this.setTime(time);
      if (this.state.status.hasStarted) totalSeconds--;
      this.setRemainingSeconds(totalSeconds);
    }
  };

  /* Reset */
  onResetClick = () => {
    this.resetTimer();
  };

  resetTimer = () => {
    clearInterval(this.state.timerId);
    this.resetState();
  };

  /* State */

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

  setY = (name, value) => {
    const touch = this.state.touch;
    touch[name] = value;

    this.setState((prevState) => ({ ...prevState, touch }));
  };

  resetState = () => {
    const time = this.state.startTime;
    const remaindingSeconds = 120;
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

  //#region Time String
  buildTimeString = (hour, minute, second) => {
    return `${this.converToTimeDisplay(hour)} : ${this.converToTimeDisplay(
      minute
    )} : ${this.converToTimeDisplay(second)}`;
  };

  converToTimeDisplay = (num) => {
    let numString = num.toString();
    if (num < 10) numString = `0${numString}`;
    return numString;
  };

  getTimeString = (seconds) => {
    const time = this.convertSecondsToTime(seconds);
    const { hour, minute, second } = time;
    return this.buildTimeString(hour, minute, second);
  };
  //#endregion

  //#region Time Math
  convertTimeToSeconds = (time) => {
    const { hour, minute, second } = time;
    const total =
      hour * SECONDS_IN_HOURS + minute * SECONDS_IN_MINUTES + second;
    return total;
  };

  convertSecondsToTime = (seconds) => {
    const hour = this.getHours(seconds);
    seconds = seconds - hour * SECONDS_IN_HOURS;

    const minute = this.getMinutes(seconds);
    seconds = seconds - minute * SECONDS_IN_MINUTES;

    const second = seconds;

    const time = {
      hour,
      minute,
      second,
    };

    return time;
  };

  getHours = (seconds) => Math.floor(seconds / SECONDS_IN_HOURS);

  getMinutes = (seconds) => Math.floor(seconds / SECONDS_IN_MINUTES);
  //#endregion

  render() {
    const { hour, minute, second } = this.state.time;

    return (
      <div className="container-fluid p-3">
        <div className="row justify-content-center px-md-5">
          <div className="col-md-8 card bg-dark text-white">
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
                <div className="col-3 input-group">
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
                </div>
                <div className="col-3 input-group">
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
                </div>
                <div className="col-3 input-group">
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
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row justify-content-center px-3">
                <div className="col-sm-12 col-md-8 col-lg-6 row justify-content-between">
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
                    className="btn btn-secondary"
                    onClick={this.onStartClick}
                    disabled={this.state.status.hasStarted}
                  >
                    Start
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={this.onPauseClick}
                    disabled={!this.state.status.hasStarted}
                  >
                    {this.state.status.isPaused ? "Resume" : "Pause"}
                  </button>
                  <button
                    className="btn btn-secondary"
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
