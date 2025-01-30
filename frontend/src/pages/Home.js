import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";
import './Home.css'; 

function Home() {
  return (
    <div className="home-container">
      <Typography variant="h2" gutterBottom align="center">
        Welcome to Learning Hub
      </Typography>
      <div className="home-card-container">
        <Card className="home-card">
          <CardContent>
            <Typography variant="h5">Login</Typography>
            <Typography>Access your account to manage courses.</Typography>
            <Link to="/pages/login">
              <Button variant="contained" color="primary">Login</Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="home-card">
          <CardContent>
            <Typography variant="h5">Sign Up</Typography>
            <Typography>Create an account to start learning.</Typography>
            <Link to="/pages/signup">
              <Button variant="contained" color="secondary">Sign Up</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Home;
