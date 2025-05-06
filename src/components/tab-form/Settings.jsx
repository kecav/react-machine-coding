import React from "react";

const Settings = ({ data, onChangeHandler }) => {
  return (
    <div>
      <div className="div">
        <input
          type="radio"
          name="Dark"
          id=""
          checked={data.theme === "dark"}
          onChange={(e) => onChangeHandler(e, "theme")}
        />
        <label htmlFor="theme">Dark</label>
      </div>
      <div className="div">
        <input
          type="radio"
          name="Light"
          id=""
          checked={data.theme === "light"}
          onChange={(e) => onChangeHandler(e, "theme")}
        />
        <label htmlFor="theme">Light</label>
      </div>
    </div>
  );
};

export default Settings;
