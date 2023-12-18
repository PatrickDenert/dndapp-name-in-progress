from flask import request, jsonify
from app.models import User
from app import api,db

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

@api.route('/login', methods=["POST"])
def login():
    login = request.get_json()
    check_user = User(username=login['username'],password=login['password'])
    query = db.session.query(User).filter(User.username==check_user.username, User.password==check_user.password)
    for result in query:
        return jsonify(result.as_dict()),201

    return "Account Does Not Exist",404
