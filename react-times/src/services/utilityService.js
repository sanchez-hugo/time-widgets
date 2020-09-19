const SECONDS_IN_MINUTES = 60;
const SECONDS_IN_HOURS = 3600;

//#region Time String
const buildTimeString = (hour, minute, second) => {
  return `${convertToTimeDisplay(hour)} h ${convertToTimeDisplay(
    minute
  )} m ${convertToTimeDisplay(second)} s`;
};

const convertToTimeDisplay = (num) => {
  let numString = num.toString();
  if (num < 10) numString = `0${numString}`;
  return numString;
};

const getTimeString = (seconds) => {
  const time = convertSecondsToTime(seconds);
  const { hour, minute, second } = time;
  return buildTimeString(hour, minute, second);
};

//#endregion

//#region Time Math
const convertTimeToSeconds = (time) => {
  const { hour, minute, second } = time;
  const total = hour * SECONDS_IN_HOURS + minute * SECONDS_IN_MINUTES + second;
  return total;
};

const convertSecondsToTime = (seconds) => {
  const hour = getHours(seconds);
  seconds = seconds - hour * SECONDS_IN_HOURS;

  const minute = getMinutes(seconds);
  seconds = seconds - minute * SECONDS_IN_MINUTES;

  const second = seconds;

  const time = {
    hour,
    minute,
    second,
  };

  return time;
};

const getHours = (seconds) => Math.floor(seconds / SECONDS_IN_HOURS);

const getMinutes = (seconds) => Math.floor(seconds / SECONDS_IN_MINUTES);
//#endregion

export {
  buildTimeString,
  convertToTimeDisplay,
  getTimeString,
  convertTimeToSeconds,
  convertSecondsToTime,
  getHours,
  getMinutes
};
