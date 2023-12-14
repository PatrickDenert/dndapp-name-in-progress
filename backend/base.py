from flask import Flask, request
from forms import RegistrationForm, LoginForm
from flask_sqlalchemy import SQLAlchemy

api = Flask(__name__)
api.config['SECRET_KEY'] = '233867bfa97ba16324c52409ea5d3657'
api.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///test.db"
db = SQLAlchemy(api)
api.app_context().push()

@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Patrick",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body

@api.route('/register', methods=["POST"])
def register():
    user = request.get_json()
    new_user = User(username=user['username'],email=user['email'],password=user['password'])
    print(new_user)
    db.session.add(new_user)
    db.session.commit()

    return "Done",201

@api.route('/login')
def login():
    response_body = {
        "name": "Patrick",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=True, nullable=False)
