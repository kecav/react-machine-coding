import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./style.css";

const AutoComplete = () => {
  const [list, setList] = useState([]);
  const [cache, setCache] = useState({});
  const [word, setWord] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);

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
  };

  const onInputHandler = (e) => {
    const value = e.target.value;
    // fetchProducts(value);
    setWord(value);
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
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setShowSuggestions(false)}
      >
        <input type="text" onChange={onInputHandler} />
        {showSuggestions && (
          <div className="suggestions">
            <div className="suggested-words">
              {list.map(({ title, id }) => {
                return (
                  <div key={id} className="word" onClick={() => setWord(title)}>
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
