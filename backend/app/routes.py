from flask import request, jsonify
from sqlalchemy.exc import IntegrityError
from app.models import User
from app import api,db,bcrypt

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
    query = db.session.query(User).filter(User.username==check_user.username, User.password==check_user.password)
    for result in query:
        return jsonify(result.as_dict()),201

    return "Account Does Not Exist",404
