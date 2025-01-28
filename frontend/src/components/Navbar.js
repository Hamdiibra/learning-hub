import React from "react";
import { Link } from "react-router-dom";
import styles from './Navbar';

function Navbar() {
  return (
    <nav className={styles.Navbar}>
      <div className={styles["navbar-logo"]}>
        <h2>WELCOME TO LEARNING-HUB</h2>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;

