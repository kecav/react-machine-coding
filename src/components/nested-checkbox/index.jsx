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
  data,
}) => {
  // on clicking checkbox, use recursion inside it
  const onCheck = (e) => {
    setCheckedNodes((prev) => {
      const newState = { ...prev, [id]: e.target.checked };

      // update all children
      const updateChildren = (node) => {
        newState[node.id] = e.target.checked;

        node.children?.forEach((child) => {
          updateChildren(child);
        });
      };

      // update the parents
      const updateParents = (node) => {
        return (newState[node.id] = node.children?.every((child) =>
          updateParents(child)
        ));
      };

      updateChildren({ id, children });
      data.forEach((obj) => updateParents(obj));
      return newState;
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
            data={data}
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

  return (
    <div className="nested-checkbox">
      <Node
        isRoot={true}
        children={data}
        checkedNodes={checkedNodes}
        setCheckedNodes={setCheckedNodes}
        data={data}
      />
    </div>
  );
};

export default NestedCheckBox;
