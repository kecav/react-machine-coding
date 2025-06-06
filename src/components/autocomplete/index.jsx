import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./style.css";

const AutoComplete = () => {
  const [list, setList] = useState([]);
  const [cache, setCache] = useState({});
  const [word, setWord] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [currentSelected, setCurrentSelected] = useState(-1);

  const fetchProducts = async (word) => {
    let fetchedLists = [];
    if (cache[word]) {
      fetchedLists = cache[word];
    } else {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${word}`
      );
      const data = await response.json();
      fetchedLists = data.products;
    }
    setCache((prev) => {
      return { ...prev, [word]: fetchedLists };
    });
    setList(fetchedLists);
    setCurrentSelected(-1);
  };

  const onInputHandler = (e) => {
    const value = e.target.value;
    // fetchProducts(value);
    setWord(value);
  };

  const keyDownHandler = (e) => {
    const keyType = e.key;
    console.log(e);
    if (keyType === "ArrowUp") {
      if (currentSelected != -1) setCurrentSelected(currentSelected - 1);
    } else if (keyType == "ArrowDown") {
      if (currentSelected != list.length - 1)
        setCurrentSelected(currentSelected + 1);
    }
  };

  const onBlurHandler = () => {
    setShowSuggestions(false);
    setCurrentSelected(-1);
  };

  const onFocusHandler = () => {
    setShowSuggestions(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log(word);
      fetchProducts(word);
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  }, [word]);

  return (
    <div className="autocomplete">
      <div
        className="container"
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        onKeyDown={keyDownHandler}
      >
        <input type="text" onChange={onInputHandler} />
        {showSuggestions && list.length > 0 && (
          <div className="suggestions">
            <div className="suggested-words">
              {list.map(({ title, id }, index) => {
                return (
                  <div
                    key={id}
                    className={`${word} ${
                      currentSelected == index && "highlight"
                    }`}
                    onClick={() => setWord(title)}
                  >
                    {title}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoComplete;
