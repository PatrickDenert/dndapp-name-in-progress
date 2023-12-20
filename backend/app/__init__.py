from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from datetime import timedelta

api = Flask(__name__)
api.config['SECRET_KEY'] = '233867bfa97ba16324c52409ea5d3657'
api.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///test.db"
api.config["JWT_SECRET_KEY"] = "233867bfa97ba16324c52409ea5d3657"
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=24)
jwt = JWTManager(api)
db = SQLAlchemy(api)
bcrypt = Bcrypt(api)
login_manager = LoginManager(api)

api.app_context().push()

from app import routes