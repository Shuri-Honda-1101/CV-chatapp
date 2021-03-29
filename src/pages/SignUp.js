import React, { useState } from "react";
import firebase from "../config/firebase";

export const SignUp = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);

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
    const iconRef = firebase
      .storage()
      .ref()
      .child("user-image/" + avatar.name);
    console.log(avatar);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        iconRef.put(avatar).then(() => {
          iconRef.getDownloadURL().then((url) => {
            console.log(url);
            user.updateProfile({
              displayName: name,
              photoURL: url,
            });
            history.push("/");
          });
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
        <div>
          <label htmlFor="avatar">ユーザー画像</label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};
