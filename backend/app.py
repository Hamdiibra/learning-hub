from flask import Flask
from flask_migrate import Migrate
from routes import course_routes
from models import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
migrate = Migrate(app, db)
app.register_blueprint(course_routes)

if __name__ == '__main__':
    app.run(debug=True)