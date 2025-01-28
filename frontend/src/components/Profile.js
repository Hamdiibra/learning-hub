import React, { useState, useEffect } from "react";

function Profile() {
  const [userId, setUserId] = useState(1); // Test with User ID 1
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/profile/${userId}`)
      .then((res) => res.json())
      .then((data) => setEnrolledCourses(data));
  }, [userId]);

  return (
    <div>
      <h2>Your Enrolled Courses</h2>
      {enrolledCourses.length === 0 ? (
        <p>You are not enrolled in any courses.</p>
      ) : (
        enrolledCourses.map((course, index) => (
          <div key={index}>
            <h3>{course.course_name}</h3>
            <p>Progress: {course.progress}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Profile;