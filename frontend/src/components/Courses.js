import React, { useState, useEffect } from "react";
import EnrollmentForm from "./EnrollmentForm";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/courses")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch courses");
        return res.json();
      })
      .then((data) => setCourses(data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <div>
      <h2>Available Courses</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        courses.map((course) => (
          <div key={course.id}>
            <h3>{course.name}</h3>
            <p>{course.description}</p>
            <EnrollmentForm courseId={course.id} />
          </div>
        ))
      )}
    </div>
  );
}

export default Courses;