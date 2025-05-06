import { useState } from "react";

function Circles() {
  const [circles, setCircles] = useState([]);
  const [redoCircles, setRedoCircles] = useState([]);

  const addCircle = (e) => {
    // clear the redoCircles first
    setRedoCircles([]);
    console.log(e);

    setCircles((prev) => [
      ...prev,
      {
        x: e.clientX - e.target.offsetLeft,
        y: e.clientY - e.target.offsetTop,
      },
    ]);
  };

  const clear = () => {
    setCircles([]);
    setRedoCircles([]);
  };

  const undo = () => {
    if (circles.length === 0) return;

    const newCircles = [...circles];
    const lastCircle = newCircles.pop();

    setCircles(newCircles);
    setRedoCircles((prev) => [...prev, lastCircle]);
  };

  const redo = () => {
    if (redoCircles.length === 0) return;

    const newRedoCircles = [...redoCircles];
    const lastCircle = newRedoCircles.pop();

    setRedoCircles(newRedoCircles);
    setCircles((prev) => [...prev, lastCircle]);
  };

  console.log(circles);

  return (
    <main>
      <div className="buttons">
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
        <button onClick={clear}>Clear</button>
      </div>
      <section onClick={addCircle}>
        {circles.map(({ x, y }, index) => {
          return (
            <div
              className="circle"
              key={index}
              style={{ left: x, top: y }}
            ></div>
          );
        })}
      </section>
    </main>
  );
}

export default Circles;
