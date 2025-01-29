import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Courses from "./components/Courses";
import Profile from "./components/Profile";
import Login from "./pages/login"; // Login page component
import Signup from "./pages/Signup";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pages/login" element={<Login />} />
        <Route path="/pages/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;