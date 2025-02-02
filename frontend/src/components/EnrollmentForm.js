import React from "react";
import './EnrollmentForm.css';

function EnrollmentForm({ courseId, refreshProfile }) {
  const userId = localStorage.getItem('userId'); // Assume User ID 1 for testing

  const handleEnroll = () => {
    fetch("http://127.0.0.1:5000/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, course_id: courseId }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        if (refreshProfile) refreshProfile(); // Refresh Profile after enrolling
      })
      .catch((error) => console.error("Enrollment Error:", error));
  };

  return (
    <button className="enroll-button" onClick={handleEnroll}>Enroll</button>
  );
}

export default EnrollmentForm;
