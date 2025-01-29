import React from "react";
import { Link } from "react-router-dom";
import './Home.css'; // Your styles

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <p>Manage and enroll in courses with ease.</p>
        <Link to="/pages/login">
          <button className="login-signup-btn">Login</button>
        </Link>
        <Link to="/pages/signup">
          <button className="login-signup-btn">Sign Up</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
