from flask import Flask
from flask_sqlalchemy import SQLAlchemy


api = Flask(__name__)
api.config['SECRET_KEY'] = '233867bfa97ba16324c52409ea5d3657'
api.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///test.db"
db = SQLAlchemy(api)
api.app_context().push()

from app import routes