import React, { useEffect, useState } from "react";
import "./style.css";

const ProgressBarComponent = ({ progress }) => {
  const [progressVal, setProgressVal] = useState(progress);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgressVal((prev) => {
        if (prev >= 100) {
          clearInterval(interval); // Clear the interval when progress reaches 100
          return 100;
        }
        return prev + 1;
      });
    }, 100);
  
    return () => {
      clearInterval(interval); // Cleanup the interval on component unmount
    };
  }, []);

  return (
    <div className="progress-bar">
      <div className="bar-parent">
        <div className="progress" style={{ width: `${progressVal}%` }}>
          {progressVal}%
        </div>
      </div>
    </div>
  );
};

const ProgressBar = () => {
  const bars = [0, 25, 50, 80, 100];
  return (
    <>
      {bars.map((bar, index) => {
        return <ProgressBarComponent key={index} progress={bar} />;
      })}
    </>
  );
};

export default ProgressBar;
