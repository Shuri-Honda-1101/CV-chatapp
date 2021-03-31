import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthServise";
import firebase from "../config/firebase";

export const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useContext(AuthContext);
  if (user) {
    return <Redirect to={"/"} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            value={email}
            id="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <br />
      </form>

      <button
        onClick={() => {
          history.push("/signup");
        }}
      >
        SignUpはコチラから
      </button>

      {/* <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} /> */}
      {/* Appコンポーネントで遷移の指定は行っているため、ここで再度書く必要はない。 */}
    </>
  );
};
