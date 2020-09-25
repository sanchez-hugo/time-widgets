import React, { PureComponent } from "react";

class Clock extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      timeString: "",
      dateString: "",
      clockIntervalId: 0,
    };
  }

  componentDidMount() {
    const now = this.getClock();

    this.setClock(now);

    const clockIntervalId = setInterval(this.updateClock, 1000);
    this.setClockIntervalId(clockIntervalId);
  }

  componentWillUnmount() {
    if (this.state.clockIntervalId) clearInterval(this.state.clockIntervalId);
  }

  updateClock = () => {
    const now = this.getClock();

    this.setClock(now);
  };

  setClockIntervalId = (clockIntervalId) => {
    this.setState((prevState) => ({ ...prevState, clockIntervalId }));
  };

  setClock = (now) => {
    const { today, dateString, timeString } = now;
    this.setState((prevState) => ({
      ...prevState,
      today,
      dateString,
      timeString,
    }));
  };

  getClock() {
    const today = new Date();
    const timeString = today.toLocaleTimeString("en-US");
    const dateString = today.toDateString();
    return { dateString, timeString, today };
  }

  render() {
    const { dateString, timeString } = this.state;

    return (
      <div className="container-fluid p-3">
        <div className="row justify-content-center px-md-5">
          <div className="col-md-6">
            <div className="card bg-dark text-white">
              <div className="card-header text-center">
                <h3 className="card-title font-weight-light">Clock</h3>
              </div>
              <div className="card-body">
                <h1 className="text-center display-3">
                  {timeString ? timeString : `Getting time...`}
                </h1>
              </div>
              <div className="card-body">
                <div className="text-center font-weight-light h4">
                  {dateString ? dateString : `Getting date...`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Clock;
