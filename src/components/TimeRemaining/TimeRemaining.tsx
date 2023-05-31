import React, { useEffect, useState } from "react";

interface TimeRemainingProps {
  endTime: number; // Unix timestamp in seconds
}

const TimeRemaining = (endTime: number) => {
  const [countdown, setCountdown] = useState<number>(0);

  useEffect(() => {
    // Calculate the initial countdown value
    const initialCountdown = Math.max(
      endTime - Math.floor(Date.now() / 1000),
      0
    );
    setCountdown(initialCountdown);

    // Update the countdown every second
    const interval = setInterval(() => {
      const remainingTime = Math.max(
        endTime - Math.floor(Date.now() / 1000),
        0
      );
      setCountdown(remainingTime);
    }, 1000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [endTime]);

  const formatTime = (time: number): string => {
    const days = Math.floor(time / (60 * 60 * 24));
    const hours = Math.floor((time % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((time % (60 * 60)) / 60);
    const seconds = time % 60;

    if (days !== 0) {
      return `${days}d ${hours}h`;
    } else if (days === 0 && hours !== 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m ${seconds}s`;
    }
  };

  return formatTime(countdown);
};

export default TimeRemaining;
