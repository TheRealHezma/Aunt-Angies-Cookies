from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Cookie
from datetime import datetime, timezone

cookie_routes = Blueprint('cookies', __name__)

#Get All Cookies
@cookie_routes.route('/', methods=['GET'])
@login_required
def get_all_cookies():
    """
    Get all cookies that exist in the db
    """
    cookies = Cookie.query.all()
    return jsonify([cookie.to_dict() for cookie in cookies])

#Get cookie by id
@cookie_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_cookie_by_id(id):
    """
    Returns a cookie by specific id
    """
    cookie = Cookie.query.get(id)

    if not cookie:
        return jsonify({'message': 'Cookie could not be found'}), 404
    return jsonify(cookie.to_dict()), 200

#Post a new Cookie
@cookie_routes.route('/', methods=['POST'])
@login_required
def create_cookie():
    """
    Create a new cookie
    """
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    price = data.get('price')

    if not name or not description or not price:
        return jsonify({"message": "Please fill out all fields"}), 400


    new_cookie = Cookie(
        user_id=current_user.id,
        name=name,
        description=description,
        price=price
    )

    db.session.add(new_cookie)
    db.session.commit()
    return jsonify(new_cookie.to_dict()), 201

#Edit a Cookie
@cookie_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_cookie(id):
    """
    Edit a cookie by id
    """
    data = request.get_json()
    cookie = Cookie.query.get(id)

    if not cookie:
        return jsonify({'message': 'Cookie could not be found'}), 404

    if cookie.user_id != current_user.id:
        return jsonify({'message': 'Unauthorized'}), 403

    cookie.name = data.get('name', cookie.name)
    cookie.description = data.get('description', cookie.description)
    cookie.price = data.get('price', cookie.price)
    # cookie.updated_at = datetime.now(timezone.est)

    db.session.commit()

    return jsonify(cookie.to_dict()), 200

#delete a Cookie
@cookie_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_cookie(id):
    cookie = Cookie.query.get(id)
    if not cookie:
        return jsonify({'message': 'Cookie could not be found'}), 404
    if cookie.user_id != current_user.id:
        return jsonify({'message': 'Unauthorized'}), 403

    db.session.delete(cookie)
    db.session.commit()
    return jsonify({'message': 'Cookie successfully deleted'}), 200
