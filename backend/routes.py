from flask import Blueprint, request, jsonify
from models import db, User, Course, Enrollment
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

import logging

logging.basicConfig(level=logging.DEBUG)
course_routes = Blueprint('courses', __name__)

@course_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data.get('username')).first()
    
    if not user:
        return jsonify({"error": "User not found"}), 404

    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user": {"id": user.id, "username": user.username, "role": user.role}})

# Create Course
@course_routes.route('/courses', methods=['POST'])
@jwt_required()
def create_course():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user or user.role != "instructor":
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    new_course = Course(name=data['name'], instructor_id=user.id)
    db.session.add(new_course)
    db.session.commit()
    return jsonify({"message": "Course created successfully!"})

@course_routes.route('/unenroll', methods=['DELETE'])
def unenroll_user():
    data = request.get_json()
    user_id = data.get("user_id")
    course_id = data.get("course_id")

    if not user_id or not course_id:
        return jsonify({"error": "User ID and Course ID are required"}), 400

    enrollment = Enrollment.query.filter_by(user_id=user_id, course_id=course_id).first()

    if not enrollment:
        return jsonify({"error": "Enrollment not found"}), 404

    db.session.delete(enrollment)
    db.session.commit()

    return jsonify({"message": "Successfully unenrolled from course"}), 200


@course_routes.route('/courses/<int:course_id>', methods=['PATCH'])
def update_course(course_id):
    data = request.get_json()

    course = Course.query.get(course_id)
    if not course:
        return jsonify({"error": "Course not found"}), 404

    if data.get('name'):
        if len(data['name']) < 5:
            return jsonify({"error": "Course name must be at least 5 characters"}), 400
        course.name = data['name']

    if data.get('description'):
        course.description = data['description']

    if data.get('image_url'):
        course.image_url = data['image_url']

    db.session.commit()
    return jsonify({"message": "Course updated successfully!"})

@course_routes.route('/courses/<int:course_id>', methods=['DELETE'])
def delete_course(course_id):
    course = Course.query.get(course_id)
    if not course:
        return jsonify({"error": "Course not found"}), 404

    db.session.delete(course)
    db.session.commit()
    return jsonify({"message": "Course deleted successfully!"})

# Get All Courses
@course_routes.route('/courses', methods=['GET'])
def get_courses():
    courses = Course.query.all()
    return jsonify([{
        "id": course.id,
        "name": course.name,
        "instructor": {
            "id": course.instructor.id,
            "username": course.instructor.username
        },
        "description": course.description,
        "image_url": course.image_url
    } for course in courses])


@course_routes.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    if not data.get('username') or not data.get('role'):
        return jsonify({"error": "Username and role are required"}), 400

    if User.query.filter_by(username=data['username']).first():
        return jsonify({"error": "Username already taken"}), 400

    new_user = User(
        username=data['username'],
        email=data['email'],
        password=data['password'],
        role=data['role']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfully!"})

@course_routes.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{
        "id": user.id,
        "username": user.username,
        "role": user.role
    } for user in users])

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

@course_routes.route('/enrollments/<int:enrollment_id>', methods=['PATCH'])
def update_enrollment(enrollment_id):
    data = request.get_json()
    enrollment = Enrollment.query.get(enrollment_id)
    
    if not enrollment:
        return jsonify({"error": "Enrollment not found"}), 404

    # Update progress if provided
    if 'progress' in data:
        enrollment.progress = data['progress']

    # Update grade if provided
    if 'grade' in data:
        grade = data['grade']
        if not isinstance(grade, int) or grade < 0 or grade > 100:
            return jsonify({"error": "Grade must be a number between 0 and 100"}), 400
        enrollment.grade = grade

    db.session.commit()
    return jsonify({"message": "Enrollment updated successfully!"})


@course_routes.route('/enrollments', methods=['GET'])
def get_enrollments():
    enrollments = Enrollment.query.all()
    return jsonify([{
        "id": enrollment.id,
        "user_id": enrollment.user.id,
        "course_id": enrollment.course.id,
        "progress": enrollment.progress
    } for enrollment in enrollments])

# Get Enrolled Courses for a User
@course_routes.route('/profile/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    if user.role == 'instructor':
        created_courses = [{
            "id": course.id,
            "name": course.name,
            "description": course.description
        } for course in user.courses_taught]
        return jsonify({"created_courses": created_courses})

    elif user.role == 'student':
        enrolled_courses = [{
            "id": enrollment.course.id,
            "name": enrollment.course.name,
            "progress": enrollment.progress
        } for enrollment in user.enrolled_courses]
        return jsonify({"enrolled_courses": enrolled_courses})

    return jsonify({"error": "Unknown role"}), 400