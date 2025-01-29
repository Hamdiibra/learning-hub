from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend requests


enrollments = []  # Store user enrollments

@app.route("/")
def home():
    return jsonify({"message": "Welcome to Learning Hub API"}), 200

@app.route("/courses", methods=["GET"])
def get_courses():
    return jsonify(courses), 200

@app.route("/enroll", methods=["POST"])
def enroll():
    data = request.json
    user_id = data.get("user_id")
    course_id = data.get("course_id")
    
    if not user_id or not course_id:
        return jsonify({"error": "Missing data"}), 400
    
    enrollments.append({"user_id": user_id, "course_id": course_id})
    return jsonify({"message": f"User {user_id} enrolled in course {course_id}"}), 201

@app.route("/profile/<int:user_id>", methods=["GET"])
def user_profile(user_id):
    user_courses = [course for course in courses if {"user_id": user_id, "course_id": course["id"]} in enrollments]
    return jsonify({"enrolled_courses": user_courses}), 200

if __name__ == "__main__":
    app.run(debug=True)