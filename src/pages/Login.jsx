import React from "react";

export const Login = () => {
  return (
    <>
      <h1>Login</h1>
      <form>
        <div>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" name="email" placeholder="Email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};
