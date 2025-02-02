import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";
import './Home.css'; 

function Home() {
  return (
    <div className="home-container">
      <Typography variant="h2" gutterBottom align="center" className="main-heading">
        Welcome to Learning Hub
      </Typography>
      <Typography variant="h6" paragraph align="center" className="sub-heading">
        Empower yourself through knowledge. Explore a wide variety of courses designed to help you achieve your personal and professional goals.
      </Typography>
      
      <div className="home-card-container">
        <Card className="home-card">
          <CardContent>
            <Typography variant="h5" className="card-heading">Login</Typography>
            <Typography paragraph className="card-text">
              Log in to your account to access your courses.
            </Typography>
            <Link to="/pages/login">
              <Button variant="contained" color="primary" className="auth-button">Login</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="home-card">
          <CardContent>
            <Typography variant="h5" className="card-heading">Sign Up</Typography>
            <Typography paragraph className="card-text">
              Sign up now and unlock access to exclusive courses.
            </Typography>
            <Link to="/pages/signup">
              <Button variant="contained" color="primary" className="auth-button">Sign Up</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="extra-info-container">
        <Typography variant="h6" align="center" className="extra-info-text">
          Start today, learn at your own pace, and reach your goals with us. Let's make learning a part of your lifestyle!
        </Typography>
      </div>
    </div>
  );
}

export default Home;
