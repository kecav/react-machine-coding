import React, { useEffect, useRef, useState } from "react";
import "./style.css";

const OTPComponent = ({ size }) => {
  const [inputs, setInputs] = useState(new Array(size).fill(""));
  const inputsRef = useRef([]);

  const update = (val, index) => {
    if(!val) return;
    const newInputs = [...inputs];
    newInputs[index] = val ? val[0] : "";
    setInputs(newInputs);
    if (val) inputsRef.current[index + 1]?.focus();
  };

  const inputBack = (e, index) => {
    if (e.key === "Backspace") {
      const newInputs = [...inputs];
      inputsRef.current[index - 1]?.focus();
      newInputs[index] = "";
      setInputs(newInputs);
    }
  };

  useEffect(() => {
    inputsRef?.current[0]?.focus();
  }, []);

  return (
    <div className="otp-component">
      {inputs.map((inp, ind) => {
        return (
          <input
            key={ind}
            type="text"
            ref={(el) => (inputsRef.current[ind] = el)}
            onKeyDown={(e) => inputBack(e, ind)}
            value={inp}
            onChange={(e) => update(e.target.value, ind)}
            maxLength={1}
          />
        );
      })}
    </div>
  );
};

const OTPInput = () => {
  return <OTPComponent size={5} />;
};

export default OTPInput;
