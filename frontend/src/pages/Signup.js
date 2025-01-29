import React from "react";

function Signup() {
  return (
    <div>
      <h2>Sign Up Page</h2>
      <form>
        <label>Name:</label>
        <input type="text" placeholder="Enter your name" />
        <label>Email:</label>
        <input type="email" placeholder="Enter your email" />
        <label>Password:</label>
        <input type="password" placeholder="Enter your password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
