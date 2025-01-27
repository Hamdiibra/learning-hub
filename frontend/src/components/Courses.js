import React, { useState, useEffect } from 'react';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/courses')
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  return (
    <div>
      <h1>Courses</h1>
      {courses.map((course) => (
        <div key={course.id}>
          <h3>{course.name}</h3>
          <p>{course.description}</p>
          <p>Instructor: {course.instructor}</p>
          <button>Enroll</button>
        </div>
      ))}
    </div>
  );
}

export default Courses;