import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

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
