import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import Interest from "./Interest";
import Settings from "./Settings";
import "./style.css";

const tabs = [
  {
    name: "Profile",
    component: Profile,
  },
  {
    name: "Interest",
    component: Interest,
  },
  {
    name: "Settings",
    component: Settings,
  },
];

const TabForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const ActiveComponent = tabs[activeTab].component;

  const [data, setData] = useState({
    name: "",
    age: "",
    interest: "",
    email: "",
    theme: "light",
  });

  const activateTab = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const sanitizeValues = () => {
    for (let d of data) {
      console.log(d);
    }
  };

  const onChangeHandler = (e, dName) => {
    let value = e.target.value;
    let name = e.target.name;

    // sanitizesI
    if (dName == "theme") {
      value = data.theme === "dark" ? "light" : "dark";
    }

    if (dName == "interest") {
      if (data.interest.includes(name)) {
        value = data.interest.filter((i) => i !== name);
      } else {
        value = [...data.interest, name];
      }
      setData({
        ...data,
        interest: value,
      });
    } else {
      setData((prev) => {
        return {
          ...prev,
          [dName]: value,
        };
      });
    }
  };

  const moveToPrevTab = () => {
    if (activeTab == 0) return;
    setActiveTab(activeTab - 1);
  };

  const moveToNextTab = () => {
    if (activeTab == tabs.length - 1) return;
    setActiveTab(activeTab + 1);
  };

  return (
    <div className="tab-form">
      <div className="container">
        <header>
          {tabs.map(({ name }, index) => {
            const classname = activeTab === index ? "tab active" : "tab";
            return (
              <div
                className={classname}
                key={index}
                onClick={() => activateTab(index)}
              >
                {name}
              </div>
            );
          })}
        </header>
        <main className="main">
          <ActiveComponent data={data} onChangeHandler={onChangeHandler} />
        </main>
        <footer>
          <button className="prev" onClick={moveToPrevTab}>
            Prev
          </button>
          <button className="next" onClick={moveToNextTab}>
            Next
          </button>
          {activeTab == tabs.length - 1 && (
            <button onClick={sanitizeValues}>Submit</button>
          )}
        </footer>
      </div>
    </div>
  );
};

export default TabForm;
