import React from "react";
import useBoolean from "./hook";

const useBooleanHook = () => {
  const { value, setTrue, setFalse, toggle } = useBoolean();

  return (
    <div>
      <p>{value ? "ON" : "OFF"}</p>
      <button onClick={setTrue}>Turn ON</button>
      <button onClick={setFalse}>Turn OFF</button>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
};

export default useBooleanHook;
