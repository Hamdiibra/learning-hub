import React, { useState, useEffect } from "react";
import EnrollmentForm from "./EnrollmentForm";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  return (
    <div>
      <h2>Available Courses</h2>
      {courses.map((course) => (
        <div key={course.id}>
          <h3>{course.name}</h3>
          <p>{course.description}</p>
          <EnrollmentForm courseId={course.id} />
        </div>
      ))}
    </div>
  );
}

export default Courses;