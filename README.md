# learning-hub
## Introduction

This is a simple web application that allows users to enroll in courses and view their enrolled courses on their profile. The application uses a Flask backend and a React frontend.

## Features

- User Authentication
- Course Enrollment
- View Enrolled Courses
- Unenroll from Courses
- Instructor-specific features (create, update, delete courses)

## Technologies Used

### Frontend

- React
- Material-UI

### Backend

- Flask
- SQLAlchemy (ORM for database interactions)
- Flask-JWT-Extended (for authentication)

## Installation

### Prerequisites

- Node.js
- Python 3.8+
- PostgreSQL

### Backend

1. Clone the repository
   ```sh
   git clone <repository-url>
Create a virtual environment and activate it

sh
python -m venv venv
source venv/bin/activate   # On Windows, use `venv\Scripts\activate`
Install the required packages

sh
pip install -r requirements.txt
Set up the database

sh
flask db init
flask db migrate
flask db upgrade
Run the backend server

sh
flask run
Frontend
Navigate to the frontend directory

sh
cd frontend
Install the dependencies

sh
npm install
Run the frontend server

sh
npm start
Usage
Create an account or log in as an existing user.

As a student, browse the available courses and enroll in them.

View your enrolled courses on your profile.

As an instructor, create, update, or delete courses.

API Endpoints
Authentication
POST /login - Log in and receive a JWT token

User Profile
GET /profile/<int:user_id> - Get the profile details of a user

Courses
POST /courses - Create a new course (instructors only)

PATCH /courses/<int:course_id> - Update a course (instructors only)

DELETE /courses/<int:course_id> - Delete a course (instructors only)

GET /courses - Get all available courses

Enrollment
POST /enroll - Enroll a user in a course

DELETE /unenroll - Unenroll a user from a course

Contributing
If you would like to contribute to this project, please fork the repository and submit a pull request. We welcome all contributions!

License
This project is licensed under the MIT License - see the LICENSE file for details.


Feel free to customize this template to better match your project's specifics and add any additional details you think are necessary. Let me know if there's anything else you'd like to include!

