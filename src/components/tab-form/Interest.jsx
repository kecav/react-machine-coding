import React from "react";

const Interest = ({ data, onChangeHandler }) => {
  const { interest } = data;
  return (
    <div>
      <div className="Coding">
        <input
          type="checkbox"
          name="coding"
          id=""
          checked={interest.includes("coding")}
          onChange={(e) => onChangeHandler(e, "interest")}
        />
        <label htmlFor="coding">Coding</label>
      </div>
      <div className="Music">
        <input
          type="checkbox"
          name="music"
          checked={interest.includes("music")}
          onChange={(e) => onChangeHandler(e, "interest")}
        />
        <label htmlFor="music">Music</label>
      </div>
    </div>
  );
};

export default Interest;
