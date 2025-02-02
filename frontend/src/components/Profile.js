import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";

function Profile() {
  const [userId] = useState(localStorage.getItem("userId"));
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError("You are not logged in.");
      return;
    }
    console.log("Fetching enrolled courses for user:", userId); 
  
    fetch(`http://127.0.0.1:5000/profile?user_id=${userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched enrolled courses:", data);
        setEnrolledCourses(data.enrolled_courses);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
      });
  }, [userId]);
  
  
  const handleUnenroll = (courseId) => {
    fetch("http://127.0.0.1:5000/unenroll", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId, course_id: courseId }),
    })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to unenroll");
      return res.json();
    })
    .then(() => {
      setEnrolledCourses((prevCourses) =>
        prevCourses.filter((enrollment) => enrollment.course.id !== courseId)
      );
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
          {enrolledCourses.map((enrollment, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                {enrollment.course ? (
                    <Typography variant="h5">{enrollment.course.name}</Typography>
                  ) : (
                    <Typography variant="h5">Course name unavailable</Typography>
                  )}

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUnenroll(enrollment.course.id)}
                    style={{ marginTop: "10px" }}
                  >
                    Un-enroll
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
