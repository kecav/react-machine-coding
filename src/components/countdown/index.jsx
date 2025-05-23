import React, { useEffect, useState } from "react";
import "./style.css";

let timer = null;
const Countdown = () => {
  const [state, setState] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [buttonState, setButtonState] = useState("START");

  const getTimeFormat = (secs) => {
    const hrs = parseInt(secs / 3600);
    const mins = parseInt(secs / 60) % 60;

    return [hrs, mins, secs % 60];
  };

  const timeChangeHandler = (e, multiple) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const prevTime = getTimeFormat(seconds);
    console.log(prevTime);
    if (multiple === 3600) prevTime[0] = parseInt(value);
    else if (multiple === 60) prevTime[1] = parseInt(value);
    else prevTime[2] = parseInt(value);
    console.log(prevTime);

    setSeconds(prevTime[0] * 3600 + prevTime[1] * 60 + prevTime[2]);
  };

  const resetHandler = () => {
    setSeconds(0);
    setState(null);
    setButtonState("START");
  };

  const startStopHandler = () => {
    if (state === "RUNNING") {
      setState("PAUSED");
      setButtonState("CONTINUE");
    } else if (state === "PAUSED") {
      setState("RUNNING");
      setButtonState("PAUSE");
    } else {
      setState("RUNNING");
      setButtonState("PAUSE");
    }
  };

  useEffect(() => {
    if (state === "RUNNING")
      timer = setTimeout(() => {
        if (seconds == 0) {
            resetHandler();
            return clearTimeout(timer);
        }
        setSeconds(seconds - 1);
      }, 1000);
    else clearTimeout(timer);

    return () => clearTimeout(timer);
  }, [state, seconds]);

  return (
    <div className="countdown">
      <h1>Countdown Timer</h1>
      <div className="times">
        <div className="time-section">
          <p>Hours</p>
          <input
            placeholder="00"
            type="number"
            name=""
            id=""
            value={parseInt(seconds / 3600)
              .toString()
              .padStart(2, "0")}
            onChange={(e) => timeChangeHandler(e, 3600)}
            min={0}
            step={1}
            max={100}
          />
        </div>
        <div className="time-section">
          <p>Minutes</p>
          <input
            placeholder="00"
            type="number"
            name=""
            id=""
            value={(parseInt(seconds / 60) % 60).toString().padStart(2, "0")}
            onChange={(e) => timeChangeHandler(e, 60)}
            min={0}
            step={1}
            max={60}
          />
        </div>
        <div className="time-section">
          <p>Seconds</p>
          <input
            placeholder="00"
            type="number"
            name=""
            id=""
            value={(seconds % 60).toString().padStart(2, "0")}
            onChange={(e) => timeChangeHandler(e, 1)}
            min={0}
            step={1}
            max={60}
          />
        </div>
      </div>
      <div className="action-btns">
        <button className="start" onClick={startStopHandler}>
          {buttonState}
        </button>
        <button className="reset" onClick={resetHandler}>
          RESET
        </button>
      </div>
    </div>
  );
};

export default Countdown;
