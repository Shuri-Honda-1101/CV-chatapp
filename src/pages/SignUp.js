import React, { useState } from "react";
import firebase from "../config/firebase";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user.updateProfile({
          displayName: name,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Email"
            onChange={onChangeEmail}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="password"
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="name"
            name="name"
            id="name"
            value={name}
            placeholder="name"
            onChange={onChangeName}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};
