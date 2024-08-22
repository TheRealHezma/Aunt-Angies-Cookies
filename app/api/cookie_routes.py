from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Cookie

cookie_routes = Blueprint('cookies', __name__)

#Get All Cookies
@cookie_routes.route('/', methods=['GET'])
# @login_required
def get_all_cookies():
    """
    Get all cookies that exist in the db
    """
    cookies = Cookie.query.all()
    return jsonify([cookie.to_dict() for cookie in cookies])

#Get cookie by id
@cookie_routes.route('/<int:id>/', methods=['GET'])
# @login_required
def get_cookie_by_id(id):
    """
    Returns a cookie by specific id
    """

#Post a new Cookie

#Edit a Cookie

#delete a Cookie
