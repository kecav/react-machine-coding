import React, { useEffect, useState } from "react";
import "./style.css";

const rows = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const InteractiveGrid = () => {
  const [cells, setCells] = useState(rows);
  const [stk, setSTK] = useState([]);
  const [isRemoving, setIsRemoving] = useState(false);

  const cellHandler = (index1, index2) => {
    const tempCells = [...cells];
    tempCells[index1][index2] = 1;

    setCells(tempCells);
    setSTK([...stk, [index1, index2]]);
  };

  const removeLast = () => {
    const newStk = [...stk];
    const tempCells = [...cells];
    const indices = newStk.shift();
    console.log(indices);
    tempCells[indices[0]][indices[1]] = 0;

    setTimeout(() => {
      setCells(tempCells);
      setSTK(newStk);
    }, 500);
  };

  useEffect(() => {
    if (stk.length == 9 || isRemoving) {
      if(stk.length == 0) {
        setIsRemoving(false);
        return;
      }
      setIsRemoving(true);
      removeLast();
    }
  }, [stk, isRemoving]);

  return (
    <div className="interactive-grid">
      {rows.map((row, index1) => {
        return (
          <div className="row" key={index1}>
            {row.map((col, index2) => {
              const name = col === 1 ? "cell color" : "cell";
              return (
                <div
                  className={name}
                  key={index2}
                  onClick={() => cellHandler(index1, index2)}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default InteractiveGrid;
