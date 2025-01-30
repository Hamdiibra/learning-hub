import React, { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Grid, CircularProgress } from "@mui/material";
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
      .then((data) => {
        console.log(data); // Log the fetched data
        setCourses(data);
      })
      .catch((error) => setError(error.message));
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Available Courses
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {courses.length === 0 ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={4}>
          {courses.map((course) => (
            <Grid item key={course.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={course.image_url && course.image_url.startsWith("http") ? course.image_url : "https://via.placeholder.com/140"}
                  alt={course.name}
                />
                <CardContent>
                  <Typography variant="h5">{course.name}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Instructor: {course.instructor.username}
                  </Typography>
                  <Typography variant="body2">{course.description}</Typography>
                  <EnrollmentForm courseId={course.id} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default Courses;
