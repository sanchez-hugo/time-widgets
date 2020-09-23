const SECONDS_IN_MINUTES = 60;
const SECONDS_IN_HOURS = 3600;

const MS_IN_SECONDS = 1000;

const MS_IN_MINUTES = SECONDS_IN_MINUTES * MS_IN_SECONDS;
const MS_IN_HOURS = SECONDS_IN_HOURS * MS_IN_SECONDS;

//#region Time String
const convertToTimeDisplay = (num) => {
  let numString = num.toString();
  if (num < 10 && num !== 0) numString = `0${numString}`;
  return numString;
};

const buildTimeString = (time) => {
  const { hour, minute, second } = time;
  return `${convertToTimeDisplay(hour)} h ${convertToTimeDisplay(
    minute
  )} m ${convertToTimeDisplay(second)} s`;
};

const getTimeString = (seconds) => {
  const time = convertSecondsToTime(seconds);

  return buildTimeString(time);
};

const buildTimeStringV2 = (time) => {
  const totalMilseconds = convertTimeToMilliseconds(time);
  const { hour, minute, second, milsecond } = time;

  let timeString = "";

  if (totalMilseconds > MS_IN_MINUTES)
    timeString = `${convertToTimeDisplay(hour)} hr : ${convertToTimeDisplay(
      minute
    )} m : ${convertToTimeDisplay(second)} s : ${convertToTimeDisplay(
      milsecond / 10
    )} ms`;
  else if (totalMilseconds > MS_IN_SECONDS)
    timeString = `${convertToTimeDisplay(minute)} m : ${convertToTimeDisplay(
      second
    )} s : ${convertToTimeDisplay(milsecond / 10)} ms`;
  else
    timeString = `${convertToTimeDisplay(second)} s : ${convertToTimeDisplay(
      milsecond / 10
    )} ms`;

  /* // Method 2 omits zeroes

  let timeString = "";
  if (milsecond > 0) timeString = `${convertToTimeDisplay(milsecond)} ms`;
  if (second > 0) timeString = `${convertToTimeDisplay(second)} s ${timeString}`;
  if (minute > 0) timeString = `${convertToTimeDisplay(minute)} m ${timeString}`;
  if (hour > 0) timeString = `${convertToTimeDisplay(hour)} hr ${timeString}`;
  */

  /* // Method 3 Inlcudes zeroes 

  const timeString = `${convertToTimeDisplay(hour)} hr : ${convertToTimeDisplay(
    minute
  )} m : ${convertToTimeDisplay(second)} s : ${convertToTimeDisplay(
    milsecond
  )} ms`;
  */
  return timeString;
};

const getTimeStringV2 = (milseconds) => {
  const time = convertMilsecondsToTime(milseconds);

  return buildTimeStringV2(time);
};

//#endregion

//#region Time Math

// --- Seconds ---
const extractHoursFromSeconds = (seconds) =>
  Math.floor(seconds / SECONDS_IN_HOURS);
const extractMinutesFromSeconds = (seconds) =>
  Math.floor(seconds / SECONDS_IN_MINUTES);

const getHoursInSeconds = (seconds) => seconds * SECONDS_IN_HOURS;
const getMinutesInSeconds = (seconds) => seconds * SECONDS_IN_MINUTES;

const convertTimeToSeconds = (time) => {
  const { hour, minute, second } = time;

  const hourSeconds = getHoursInSeconds(hour);
  const minuteSeconds = getMinutesInSeconds(minute);

  const totalSeconds = hourSeconds + minuteSeconds + second;
  return totalSeconds;
};

const convertSecondsToTime = (seconds) => {
  const hour = extractHoursFromSeconds(seconds);
  seconds = seconds - getHoursInSeconds(hour);

  const minute = extractMinutesFromSeconds(seconds);
  seconds = seconds - getMinutesInSeconds(minute);

  const second = seconds;

  const time = {
    hour,
    minute,
    second,
  };

  return time;
};

// --- Milliseconds ---
const extractHoursFromMilseconds = (milseconds) =>
  Math.floor(milseconds / MS_IN_HOURS);
const extractMinutesFromMilseconds = (milseconds) =>
  Math.floor(milseconds / MS_IN_MINUTES);
const extractSecondsFromMilseconds = (milseconds) =>
  Math.floor(milseconds / MS_IN_SECONDS);

const getHoursInMilseconds = (milseconds) => milseconds * MS_IN_HOURS;
const getMinutesInMilseconds = (milseconds) => milseconds * MS_IN_MINUTES;
const getSecondsInMilseconds = (milseconds) => milseconds * MS_IN_SECONDS;

const convertTimeToMilliseconds = (time) => {
  const { hour, minute, second, milsecond } = time;

  const hourMilseconds = getHoursInMilseconds(hour);
  const minuteMilseconds = getMinutesInMilseconds(minute);
  const secondMilseconds = getSecondsInMilseconds(second);

  const totalMilseconds =
    hourMilseconds + minuteMilseconds + secondMilseconds + milsecond;
  return totalMilseconds;
};

const convertMilsecondsToTime = (milseconds) => {
  const hour = extractHoursFromMilseconds(milseconds);
  milseconds = milseconds - getHoursInMilseconds(hour);

  const minute = extractMinutesFromMilseconds(milseconds);
  milseconds = milseconds - getMinutesInMilseconds(minute);

  const second = extractSecondsFromMilseconds(milseconds);
  milseconds = milseconds - getSecondsInMilseconds(second);

  const milsecond = milseconds;

  const time = {
    hour,
    minute,
    second,
    milsecond,
  };

  return time;
};

//#endregion

export {
  buildTimeString,
  convertToTimeDisplay,
  getTimeString,
  convertTimeToSeconds,
  convertTimeToMilliseconds,
  convertSecondsToTime,
  convertMilsecondsToTime,
  extractHoursFromSeconds,
  extractMinutesFromSeconds,
  extractHoursFromMilseconds,
  extractMinutesFromMilseconds,
  extractSecondsFromMilseconds,
  getHoursInSeconds,
  getMinutesInSeconds,
  getHoursInMilseconds,
  getMinutesInMilseconds,
  getSecondsInMilseconds,
  buildTimeStringV2,
  getTimeStringV2,
};
