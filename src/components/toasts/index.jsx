import React, { useEffect, useState } from "react";
import "./style.css";

const NORMAL = "NORMAL";
const SUCCESS = "SUCCESS";
const ERROR = "ERROR";
const WARNING = "WARNING";
const timed = 5 * 1000;

function getId(length = 10) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const Toast = ({ title, type = NORMAL, removeToast }) => {
  let bg;
  if (type === SUCCESS) bg = "green";
  else if (type === ERROR) bg = "red";
  else if (type === WARNING) bg = "orange";
  else bg = "#363636";

  useEffect(() => {
    setTimeout(() => {
      removeToast();
    }, timed);
  }, [removeToast]);

  return (
    <div className="toast" style={{ background: bg }}>
      <span>{title}</span>
      <span className="cross-btn" onClick={removeToast}>
        x
      </span>
    </div>
  );
};

const ToastContainer = ({ toasts, setToasts }) => {
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="toast-container">
      {toasts.map((t, i) => {
        return (
          <Toast
            title={t.title}
            key={i}
            type={t.type}
            removeToast={() => removeToast(t.id)}
          />
        );
      })}
    </div>
  );
};

const Toasts = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (type) => {
    const id = getId();
    setToasts((prev) => [...prev, { title: type, type: type, id: id }]);
  };

  useEffect(() => {}, []);
  return (
    <div className="toast-component">
      <ToastContainer toasts={toasts} setToasts={setToasts} />
      <button onClick={() => addToast("SUCCESS")}>Success</button>
      <button onClick={() => addToast("WARNING")}>Warning</button>
      <button onClick={() => addToast("NORMAL")}>Info</button>
      <button onClick={() => addToast("ERROR")}>Error</button>
    </div>
  );
};

export default Toasts;
