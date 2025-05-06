import React from "react";

const Profile = ({ data, onChangeHandler }) => {
  const { name, email, age } = data;
  return (
    <div>
      <div className="name">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id=""
          value={name}
          onInput={(e) => onChangeHandler(e, "name")}
        />
      </div>
      <div className="email">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id=""
          value={email}
          onInput={(e) => onChangeHandler(e, "email")}
        />
      </div>
      <div className="age">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="email"
          id=""
          step="1"
          min="0"
          max="100"
          value={age}
          onInput={(e) => onChangeHandler(e, "age")}
        />
      </div>
    </div>
  );
};

export default Profile;
