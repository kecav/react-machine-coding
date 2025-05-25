import React, { useEffect, useState } from "react";
import json from "./tree.json";
import "./style.css";

const Node = ({
  id,
  isRoot,
  title,
  children,
  checkedNodes,
  setCheckedNodes,
}) => {
  const onCheck = (e) => {
    setCheckedNodes((prev) => {
      return { ...prev, [id]: e.target.checked };
    });
  };

  return (
    <div className="node">
      {!isRoot && (
        <div className="checkbox">
          <input
            type="checkbox"
            name=""
            id=""
            checked={checkedNodes[id]}
            onChange={onCheck}
          />
          <label htmlFor="checkbox">{title}</label>
        </div>
      )}
      {children?.map((child) => {
        return (
          <Node
            key={child.id}
            id={child.id}
            title={child.title}
            checked={child.checked}
            children={child.children}
            checkedNodes={checkedNodes}
            setCheckedNodes={setCheckedNodes}
          />
        );
      })}
    </div>
  );
};

const NestedCheckBox = () => {
  const [data, setData] = useState([]);
  const [checkedNodes, setCheckedNodes] = useState({});

  useEffect(() => {
    setData(json);
  }, []);

  console.log(checkedNodes);
  return (
    <div className="nested-checkbox">
      <Node
        isRoot={true}
        children={data}
        checkedNodes={checkedNodes}
        setCheckedNodes={setCheckedNodes}
      />
    </div>
  );
};

export default NestedCheckBox;
