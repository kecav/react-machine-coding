import React, { useState } from "react";
import tree from "./tree.json";
import "./style.css";

const Node = ({ id, title, isFile, children, structure, setStructure }) => {
  const [showChildren, setShowChildren] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const onClickShowHide = () => {
    setShowChildren(!showChildren);
  };

  const onKeyDownHandler = (e) => {
    const value = e.key;
    if (value === "Enter") {
      setEditMode(!editMode);
    }
  };

  const onTitleChange = (e) => {
    const value = e.target.value.trim();

    const newStructure = [...structure];

    // update title whenever the node if found and return
    const updateTitle = (node) => {
      if (node.id === id) {
        node.title = value;
        return;
      }

      node.children?.map(updateTitle);
    };

    newStructure.forEach(updateTitle);
    setStructure(newStructure);
  };

  const onDelete = () => {
    const deleteNode = (childrenArray) => {
      return childrenArray
        ?.filter((child) => child.id !== id)
        .map((child) => ({
          ...child,
          children: child.children ? deleteNode(child.children) : undefined,
        }));
    };

    const newStructure = deleteNode(structure);
    setStructure(newStructure);
  };

  return (
    <div className="node">
      <div className="title">
        <>
          {editMode ? (
            <>
              <input
                type="text"
                name=""
                id=""
                value={title}
                onChange={onTitleChange}
                onKeyDown={onKeyDownHandler}
              />
              <span className="rename" onClick={() => setEditMode(!editMode)}>
                ✅
              </span>
            </>
          ) : (
            <>
              <div className="edit-title" onClick={onClickShowHide}>
                {isFile ? (
                  <p className="file">{title}</p>
                ) : (
                  <h3 className="folder">{title}</h3>
                )}
              </div>

              <span className="rename" onClick={() => setEditMode(!editMode)}>
                🖊️
              </span>
            </>
          )}

          {/* <span onClick={onAdd}>➕</span> */}
          <span onClick={onDelete}>🗑️</span>
        </>
      </div>
      <div className="children">
        {showChildren &&
          children?.map((child, index) => {
            return (
              <Node
                key={index}
                id={child.id}
                title={child.title}
                isFile={child.isFile}
                children={child.children}
                structure={structure}
                setStructure={setStructure}
              />
            );
          })}
      </div>
    </div>
  );
};

const FolderStructure = () => {
  const [structure, setStructure] = useState(tree);

  return (
    <div className="folder-structure">
      {structure?.map(({ id, title, isFile, children }, index) => (
        <Node
          key={index}
          id={id}
          title={title}
          isFile={isFile}
          children={children}
          setStructure={setStructure}
          structure={structure}
        />
      ))}
    </div>
  );
};

export default FolderStructure;
