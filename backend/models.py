from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)  
    username = db.Column(db.String(50), nullable=False)
    enrolled_courses = db.relationship('Enrollment', back_populates='user')

# Course model
class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)  
    name = db.Column(db.String(100), nullable=True)
    instructor = db.Column(db.String(50), nullable=True)
    description = db.Column(db.Text, nullable=True)
    enrollments = db.relationship('Enrollment', back_populates='course') 

# Enrollment model
class Enrollment(db.Model):
    id = db.Column(db.Integer, primary_key=True)  
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'))  
    progress = db.Column(db.String(20), default="Not Started")

    user = db.relationship('User', back_populates='enrolled_courses')
    course = db.relationship('Course', back_populates='enrollments')  
