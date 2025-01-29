import React, { useState, useEffect } from "react";

function Profile() {
  const [userId] = useState(1);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/profile/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => setEnrolledCourses(data.enrolled_courses))
      .catch((error) => setError(error.message));
  }, [userId]);

  return (
    <div>
      <h2>Your Enrolled Courses</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {enrolledCourses.length === 0 ? (
        <p>You are not enrolled in any courses.</p>
      ) : (
        enrolledCourses.map((course, index) => (
          <div key={index}>
            <h3>{course.name}</h3>
          </div>
        ))
      )}
    </div>
  );
}

export default Profile;