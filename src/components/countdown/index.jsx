import React, { useEffect, useState } from "react";
import "./style.css";

let timer = null;
const Countdown = () => {
  const [state, setState] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [buttonState, setButtonState] = useState("START");

  const timeChangeHandler = (e, multiple) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const multi = seconds / multiple;
    setSeconds(multi);
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
      return (timer = setInterval(() => {
        console.log("running", seconds);
        if (seconds == 0) {
          return clearInterval(timer);
        }
        setSeconds(seconds - 1);
      }, 1000));
    clearInterval(timer);
  }, [state]);

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
            value={hours}
            onChange={(e) => timeChangeHandler(e, 3600)}
          />
        </div>
        <div className="time-section">
          <p>Minutes</p>
          <input
            placeholder="00"
            type="number"
            name=""
            id=""
            value={minutes}
            onChange={(e) => timeChangeHandler(e, 60)}
          />
        </div>
        <div className="time-section">
          <p>Seocnds</p>
          <input
            placeholder="00"
            type="number"
            name=""
            id=""
            value={seconds % 60}
            onChange={(e) => timeChangeHandler(e, 1)}
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
