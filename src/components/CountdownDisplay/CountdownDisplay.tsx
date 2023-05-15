import { Box, Theme, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ColorFormat,
  CountdownCircleTimer,
} from "react-countdown-circle-timer";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const getDaysInSecs = (timeSec: number) =>
  Math.floor(timeSec / daySeconds) * daySeconds;

const getHoursInSecs = (timeSec: number) =>
  Math.floor((timeSec - getDaysInSecs(timeSec)) / hourSeconds) * hourSeconds;

const getMinsInSecs = (timeSec: number) =>
  Math.floor(
    (timeSec - getDaysInSecs(timeSec) - getHoursInSecs(timeSec)) / minuteSeconds
  ) * minuteSeconds;

const getSecs = (timeSec: number) =>
  Math.floor(
    timeSec -
      getDaysInSecs(timeSec) -
      getHoursInSecs(timeSec) -
      getMinsInSecs(timeSec)
  );

const CountdownDisplay = ({
  startTime,
  endTime,
}: {
  startTime: number;
  endTime: number;
}) => {
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

  const [remainingTime, setRemainingTime] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    setRemainingTime(endTime - now);
    setKey((key) => key + 1);
  }, []);

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
        key={`${key}-day`}
        duration={getDaysInSecs(endTime - startTime)}
        initialRemainingTime={getDaysInSecs(remainingTime)}
      >
        {({ elapsedTime }) => (
          <span style={spanStyle}>
            {renderTime(
              "days",
              (getDaysInSecs(endTime - startTime) -
                getDaysInSecs(elapsedTime)) /
                daySeconds
            )}
          </span>
        )}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        key={`${key}-hr`}
        duration={daySeconds}
        initialRemainingTime={getHoursInSecs(remainingTime)}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > hourSeconds,
        })}
      >
        {({ elapsedTime }) => (
          <span style={spanStyle}>
            {renderTime(
              `${isSmallScreen ? "hrs" : "hours"}`,
              24 - getHoursInSecs(elapsedTime) / hourSeconds
            )}
          </span>
        )}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        key={`${key}-min`}
        duration={hourSeconds}
        initialRemainingTime={getMinsInSecs(remainingTime)}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds,
        })}
      >
        {({ elapsedTime }) => (
          <span style={spanStyle}>
            {renderTime(
              `${isSmallScreen ? "mins" : "minutes"}`,
              60 - getMinsInSecs(elapsedTime) / minuteSeconds
            )}
          </span>
        )}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        key={`${key}-sec`}
        duration={minuteSeconds}
        initialRemainingTime={getSecs(remainingTime)}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > 0,
        })}
      >
        {({ elapsedTime }) => (
          <span style={spanStyle}>
            {renderTime(
              `${isSmallScreen ? "secs" : "seconds"}`,
              60 - getSecs(elapsedTime)
            )}
          </span>
        )}
      </CountdownCircleTimer>
    </Box>
  );
};

export default CountdownDisplay;
