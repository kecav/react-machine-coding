import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./style.css";

const TTT = ({ size }) => {
  const [grid, setGrid] = useState([]);
  const [cellValue, setCellvalue] = useState("X");
  const [isGameOver, setIsGameOver] = useState(true);

  const setValue = (row, col) => {
    if (isGameOver || grid[row][col] !== "") return;
    const newGrid = grid.map((r) => [...r]);
    console.log(newGrid);
    newGrid[row][col] = cellValue;
    setGrid(newGrid);
    if (isWinner(newGrid, row, col, cellValue)) setIsGameOver(true);
    setCellvalue(cellValue === "X" ? "O" : "X");
  };

  const isRowSame = (newGrid, row, val) => {
    for (let x = 0; x < size; x++) if (newGrid[row][x] !== val) return false;
    return true;
  };

  const isColSame = (newGrid, col, val) => {
    for (let x = 0; x < size; x++) if (newGrid[x][col] !== val) return false;
    return true;
  };

  const isDiag1Same = () => {
    const val = grid[0][0];
    if (!val) return false;
    for (let x = 1; x < size; x++) {
      if (grid[x][x] !== val) return false;
    }
    return true;
  };

  const isDiag2Same = () => {
    const val = grid[0][size - 1];
    if (!val) return false;
    for (let x = 1; x < size; x++) {
      if (grid[x][size - x - 1] !== val) return false;
    }
    return true;
  };

  const isWinner = (newGrid, i, j, val) => {
    if (isRowSame(newGrid, i, val)) return true;
    if (isColSame(newGrid, j, val)) return true;
    return false;
  };

  const reset = () => {
    let newGrid = new Array(size).fill(new Array(size).fill(""));
    setGrid(newGrid);
    setIsGameOver(false);
    setCellvalue("X");
  };

  useEffect(() => {
    if (grid.length > 0)
      if (isDiag1Same() || isDiag2Same()) setIsGameOver(true);
  }, [grid]);

  useEffect(() => {
    reset();
  }, []);

  console.log(grid);

  return (
    <div className="ttt">
      <button className="reset" onClick={reset}>
        Reset
      </button>
      {isGameOver && <>Player {`${cellValue == "X" ? 1 : 2}`} wins !</>}
      {grid.map((row, i) => {
        return (
          <div className="cell-row" key={i}>
            {row.map((val, j) => {
              return (
                <span className="cell" key={j} onClick={() => setValue(i, j)}>
                  {val}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const TicTacToe = () => {
  return <TTT size={3} />;
};

export default TicTacToe;
