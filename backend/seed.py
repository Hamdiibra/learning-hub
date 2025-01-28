from app import app, db
from models import User, Course, Enrollment

with app.app_context():
    # Clear existing data
    db.session.query(Enrollment).delete()
    db.session.query(Course).delete()
    db.session.query(User).delete()

    # Create instructors with profile pictures
    instructor1 = User(
        username="John Doe",
        role="instructor",
        profile_picture="https://randomuser.me/api/portraits/men/10.jpg"
    )
    instructor2 = User(
        username="Jane Smith",
        role="instructor",
        profile_picture="https://randomuser.me/api/portraits/women/12.jpg"
    )

    # Create students with profile pictures
    student1 = User(
        username="Alice Johnson",
        role="student",
        profile_picture="https://randomuser.me/api/portraits/women/15.jpg"
    )
    student2 = User(
        username="Bob Brown",
        role="student",
        profile_picture="https://randomuser.me/api/portraits/men/20.jpg"
    )
    student3 = User(
        username="Charlie Davis",
        role="student",
        profile_picture="https://randomuser.me/api/portraits/men/25.jpg"
    )

    # Add users to the database
    db.session.add_all([instructor1, instructor2, student1, student2, student3])

    # Create courses with images
    course1 = Course(
        name="Python for Beginners",
        instructor="John Doe",
        description="Learn the basics of Python programming, including syntax, data types, and more.",
        image_url="https://www.python.org/static/community_logos/python-logo.png"
    )
    course2 = Course(
        name="Advanced Flask Development",
        instructor="Jane Smith",
        description="Take your Flask skills to the next level by learning advanced features like blueprints, middleware, and deployment.",
        image_url="https://flask.palletsprojects.com/en/2.3.x/_images/flask-logo.png"
    )
    course3 = Course(
        name="Web Development with React",
        instructor="John Doe",
        description="Build modern, responsive web applications using React and its powerful ecosystem.",
        image_url="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
    )

    # Add courses to the database
    db.session.add_all([course1, course2, course3])

    # Enroll students in courses
    enrollment1 = Enrollment(user=student1, course=course1, progress="Completed")
    enrollment2 = Enrollment(user=student2, course=course1, progress="In Progress")
    enrollment3 = Enrollment(user=student1, course=course2, progress="Not Started")
    enrollment4 = Enrollment(user=student3, course=course3, progress="In Progress")

    # Add enrollments to the database
    db.session.add_all([enrollment1, enrollment2, enrollment3, enrollment4])

    # Commit changes
    db.session.commit()

    print("Database seeded successfully!")
