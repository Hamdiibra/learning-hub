import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from models import db  # Use the db from models.py
from routes import course_routes
from flask_jwt_extended import JWTManager

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///db.sqlite3')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_secret_key'  # Use a real secret key
jwt = JWTManager(app)


db.init_app(app)  # Initialize db properly
migrate = Migrate(app, db)
CORS(app)

app.register_blueprint(course_routes)

if __name__ == "__main__":
    app.run(debug=True)
