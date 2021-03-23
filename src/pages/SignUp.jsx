import React from "react";

export const SignUp = () => {
  return (
    <>
      <h1>Sign Up</h1>
      <form>
        <div>
          <label htmlFor="email">E-mail</label>
          <input type="email" name="email" id="email" placeholder="Email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};
