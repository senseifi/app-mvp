import { Box, Theme, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import {
  ColorFormat,
  CountdownCircleTimer,
} from "react-countdown-circle-timer";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const getTimeSeconds = (time: number) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time: number) =>
  ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time: number) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time: number) => (time / daySeconds) | 0;

const CountdownDisplay = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const isLargeScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("lg")
  );
  const theme: Theme = useTheme();

  const colors: ColorFormat = `#${theme.palette.secondary.main.substring(1)}`;
  const timerProps = {
    isPlaying: true,
    size: isSmallScreen ? 70 : 100,
    strokeWidth: isSmallScreen ? 4 : 6,
    trailStrokeWidth: 1,
    trailColor: colors,
    colors: colors,
  };

  const spanStyle: React.CSSProperties = {
    textAlign: "center",
  };

  const timeStyle: React.CSSProperties = {
    fontSize: isSmallScreen ? "1.5rem" : "2rem",
    fontWeight: "bold",
    lineHeight: "1.5rem",
  };

  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = stratTime + 243248; // use UNIX timestamp in seconds

  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  const renderTime = (dimension: String, time: number) => {
    return (
      <div className="time-wrapper">
        <div style={timeStyle}>{time}</div>
        <div>{dimension}</div>
      </div>
    );
  };

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="space-around"
      gap={1}
      paddingX={isSmallScreen ? 0 : 4}
      sx={{ mt: 7 }}
    >
      <CountdownCircleTimer
        {...timerProps}
        duration={daysDuration}
        initialRemainingTime={remainingTime}
      >
        {({ elapsedTime }) => (
          <span style={spanStyle}>
            {renderTime("days", getTimeDays(daysDuration - elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        duration={daySeconds}
        initialRemainingTime={remainingTime % daySeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > hourSeconds,
        })}
      >
        {({ elapsedTime }) => (
          <span style={spanStyle}>
            {renderTime(
              `${isSmallScreen ? "hrs" : "hours"}`,
              getTimeHours(daySeconds - elapsedTime)
            )}
          </span>
        )}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        duration={hourSeconds}
        initialRemainingTime={remainingTime % hourSeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds,
        })}
      >
        {({ elapsedTime }) => (
          <span style={spanStyle}>
            {renderTime(
              `${isSmallScreen ? "mins" : "minutes"}`,
              getTimeMinutes(hourSeconds - elapsedTime)
            )}
          </span>
        )}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        duration={minuteSeconds}
        initialRemainingTime={remainingTime % minuteSeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > 0,
        })}
      >
        {({ elapsedTime }) => (
          <span style={spanStyle}>
            {renderTime(
              `${isSmallScreen ? "secs" : "seconds"}`,
              getTimeSeconds(elapsedTime)
            )}
          </span>
        )}
      </CountdownCircleTimer>
    </Box>
  );
};

export default CountdownDisplay;
