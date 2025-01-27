from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

#user model
class User(db.Model):
    id = db.Column(db.Integer,primary_Key=True)
    username = db.Column(db.String(50), nullable=False)
    enrolled_courses = db.relationship('Enrollment',back_populates='user')

#Course model
class Course(db.Model):
    id = db.Column(db.Integer,primary_Key=True)
    name = db.Column(db.String(100), nullable=True)
    instructor = db.Column(db.String(50), nullable=True)
    description = db.Column(db.Text,nullable=True)
    enrolled_courses = db.relationship('Enrollment',back_populates='course' )

