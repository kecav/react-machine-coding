import React, { useState } from "react";
import "./style.css";

const Chip = ({ index, title, deleteChip }) => {
  return (
    <div className="chip">
      <span className="title">{title}</span>
      <div className="delete" onClick={() => deleteChip(index)}>
        x
      </div>
    </div>
  );
};

const Chips = () => {
  const [activeChips, setActiveChips] = useState([]);
  const [title, setTitle] = useState("");

  const onKeyDown = (e) => {
    if (title === "") return;
    const which = e.key;
    console.log(e);
    if (which === "Enter") {
      setActiveChips((prev) => [...prev, title]);
      setTitle("");
    }
  };

  const deleteChip = (index) => {
    setActiveChips(activeChips.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <input
        type="text"
        name=""
        id=""
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={onKeyDown}
        value={title}
      />
      <button className="delete-all" onClick={() => setActiveChips([])}>
        Delete All
      </button>
      <div className="chips-container">
        {activeChips.map((c, i) => {
          return <Chip key={i} title={c} index={i} deleteChip={deleteChip} />;
        })}
      </div>
    </div>
  );
};

export default Chips;
