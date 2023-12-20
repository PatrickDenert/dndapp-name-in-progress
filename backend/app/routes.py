from flask import request, jsonify
from sqlalchemy.exc import IntegrityError
from app.models import User
from app import api,db,bcrypt, jwt
from flask_login import login_user, current_user
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required
from datetime import datetime,timezone,timedelta
import json

@api.route('/profile')
@jwt_required()
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

    hashed_password = bcrypt.generate_password_hash(new_user.password).decode('utf-8')                  #hash password
    new_user.password = hashed_password

    if db.session.query(User).filter(User.username==new_user.username).first() != None:                                 #check if username and email exist
        if db.session.query(User).filter(User.email==new_user.email).first() != None:
            return "Account Exists",500
        else:
            return "Username is taken",500

    elif db.session.query(User).filter(User.email==new_user.email).first() != None:
        return "Email is taken",500
    else:
        db.session.add(new_user)
        db.session.commit()
        return "Account Creation Success",201

@api.route('/login', methods=["POST"])
def login():
    login = request.get_json()
    check_user = User(username=login['username'],password=login['password'])

    #query = db.session.query(User).filter(User.username==check_user.username, User.password==check_user.password)
    exists = db.session.query(User).filter(User.username==check_user.username).first()
    #print(exists)

    if exists and bcrypt.check_password_hash(exists.password, check_user.password):
        #login_user(exists, remember=False)
        access_token = create_access_token(identity=exists.username)
        print("generated token")
        return jsonify({
            'access_token':access_token
        }), 201
    else:
        return jsonify({
            'message': "Account Does Not Exist"
        }), 401

@api.route('/logout',methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@api.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original response
        return response