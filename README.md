# learning-hub
## Introduction:

-This is a simple web application that allows users to enroll in courses and view their enrolled courses on their profile. The application uses a Flask backend and a React frontend.

## Features

- User Authentication
- Course Enrollment
- View Enrolled Courses
- Unenroll from Courses
- Instructor-specific features (create, update, delete courses)

# Technologies Used:

### Frontend

- React
- Material-UI

### Backend

- Flask
- SQLAlchemy (ORM for database interactions)
- Flask-JWT-Extended (for authentication)


### Prerequisites
- Node.js
- Python 3.8+
- PostgreSQL


## Installation
1. Clone the repository:
```bash
   git clone <git@github.com:Hamdiibra/learning-hub.git>
```
2. navigate to the project directory.
``` bash
pipenv install
pipenv shell
```


### Backend
1. cd into backend

2. Install the required packages:
```bash
# Install Flask
pip install Flask

# Install Flask-SQLAlchemy for ORM
pip install Flask-SQLAlchemy

# Install Flask-JWT-Extended for authentication
pip install Flask-JWT-Extended

# Install Flask-Migrate for database migrations
pip install Flask-Migrate

pip install -r requirements.txt
```
3. Set up the database
```bash
flask db init
flask db migrate -m " Initial migration
flask db upgrade
```
4. Run the backend server
```bash
flask run
```

### Frontend
1. Navigate to the frontend directory
```bash
cd frontend
```
2. Run the frontend
```bash
npm install
npm start
```

# Usage
- Create an account or log in as an existing user.

- As a student, browse the available courses and enroll in them.

- View your enrolled courses on your profile.



# API Endpoints
- Authentication:
POST /login - Log in and receive a JWT token

- User Profile:
GET /profile/<int:user_id> - Get the profile details of a user

- Courses:
POST /courses - Create a new course (instructors only)

PATCH /courses/<int:course_id> - Update a course (instructors only)

DELETE /courses/<int:course_id> - Delete a course (instructors only)

GET /courses - Get all available courses

- Enrollment:
POST /enroll - Enroll a user in a course

DELETE /unenroll - Unenroll a user from a course

# Contributing
If you would like to contribute to this project, please fork the repository and submit a pull request.I'm welcome all contributions!

# License
This project is licensed under the MIT License - see the LICENSE file for details.

Feel free to customize this template to better match your project's specifics and add any additional details you think are necessary.
Let me know if there's anything else you'd like to include!

