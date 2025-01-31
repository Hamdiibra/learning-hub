import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";

function Profile() {
  const [userId] = useState(1); // Assume User ID 1 for testing
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

  const handleUnenroll = (courseId) => {
    fetch("http://127.0.0.1:5000/unenroll", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, course_id: courseId }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setEnrolledCourses(enrolledCourses.filter((course) => course.id !== courseId));
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Your Enrolled Courses
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {enrolledCourses.length === 0 ? (
        <Typography>You are not enrolled in any courses.</Typography>
      ) : (
        <Grid container spacing={4}>
          {enrolledCourses.map((course, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{course.name}</Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleUnenroll(course.id)}
                    style={{ marginTop: "10px" }}
                  >
                    Unenroll
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default Profile;
