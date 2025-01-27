from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

#user model
class User(db.Model):
    id = db.Column(db.Integer,primary_Key=True)
    username = db.Column(db.String(50), nullable=False)
    enrolled_courses = db.relationship('Enrollment',back_populates='user')


