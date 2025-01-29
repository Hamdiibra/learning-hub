import React from "react";

function login() {
  return (
    <div>
      <h2>Login Page</h2>
      <form>
        <label>Email:</label>
        <input type="email" placeholder="Enter your email" />
        <label>Password:</label>
        <input type="password" placeholder="Enter your password" />
        <button type="submit">Log-in</button>
      </form>
    </div>
  );
}

export default login;
