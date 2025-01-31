from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    role = db.Column(db.String(20), nullable=False)  # "instructor" or "student"
    password_hash = db.Column(db.String(128))
    enrolled_courses = db.relationship('Enrollment', back_populates='user')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __init__(self, username, role, password):
        self.username = username
        self.role = role
        self.set_password(password)

# Course model
class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    instructor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Link to User model
    instructor = db.relationship('User', backref='courses_taught', lazy=True)
    description = db.Column(db.Text, nullable=True)
    image_url = db.Column(db.String(255), default="")  # URL for course image
    enrollments = db.relationship('Enrollment', back_populates='course', cascade="all, delete-orphan")
    
    @staticmethod
    def validate_instructor(instructor_id):
        instructor = User.query.get(instructor_id)
        return instructor and instructor.role == 'instructor'
# Enrollment model
class Enrollment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'))
    progress = db.Column(db.String(20), nullable=False, default="Not Started")

    user = db.relationship('User', back_populates='enrolled_courses')
    course = db.relationship('Course', back_populates='enrollments')
