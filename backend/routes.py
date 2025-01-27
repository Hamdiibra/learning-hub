from flask import Blueprint, request, jsonify
from models import db, User, Course, Enrollment

course_routes = Blueprint('courses', __name__)

# Create Course
@course_routes.route('/courses', methods=['POST'])
def create_course():
    data = request.get_json()
    new_course = Course(
        name=data['name'],
        instructor=data['instructor'],
        description=data['description']
    )
    db.session.add(new_course)
    db.session.commit()
    return jsonify({"message": "Course created successfully!"})

# Get All Courses
@course_routes.route('/courses', methods=['GET'])
def get_courses():
    courses = Course.query.all()
    return jsonify([{
        "id": course.id,
        "name": course.name,
        "instructor": course.instructor,
        "description": course.description
    } for course in courses])

# Enroll User in a Course
@course_routes.route('/enroll', methods=['POST'])
def enroll_user():
    data = request.get_json()
    user = User.query.get(data['user_id'])
    course = Course.query.get(data['course_id'])

    if not user or not course:
        return jsonify({"error": "Invalid user or course ID"}), 400

    new_enrollment = Enrollment(user=user, course=course)
    db.session.add(new_enrollment)
    db.session.commit()
    return jsonify({"message": "User enrolled successfully!"})

# Get Enrolled Courses for a User
@course_routes.route('/profile/<int:user_id>', methods=['GET'])
def get_user_courses(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    enrolled_courses = [{
        "course_name": enrollment.course.name,
        "progress": enrollment.progress
    } for enrollment in user.enrolled_courses]

    return jsonify(enrolled_courses)