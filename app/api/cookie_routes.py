from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Cookie, Review, User
from datetime import datetime, timezone
# from flask_mail import Message

cookie_routes = Blueprint('cookies', __name__)

# ##TESTIN MAIL
# @cookie_routes.route('/checkout', methods=['POST'])
# def handle_checkout():
#     from app import mail

#     cart_items = request.json.get('cartItems')

#     if not cart_items:
#         return jsonify({"error": "No items in cart"}), 400

#     # Format the cart items for the email body
#     item_list = "\n".join([f"{item['name']} - Quantity: {item['quantity']}" for item in cart_items])

#     # Create email content
#     msg = Message(
#         'New Order Confirmation',
#         recipients=['hezmam6@gmail.com'],  # Send the email to yourself or a desired recipient
#         body=f'You have a new order with the following items:\n\n{item_list}'
#     )

#     try:
#         # Send the email
#         mail.send(msg)
#         return jsonify({"message": "Order placed and email sent successfully"}), 200
#     except Exception as e:
#         print(f"Failed to send email: {e}")
#         return jsonify({"error": "Failed to send email"}), 500
##END OF MAIL CODE

# Get All Cookies
@cookie_routes.route('/', methods=['GET'])
@login_required
def get_all_cookies():
    """
    Get all cookies that exist in the db
    """
    cookies = Cookie.query.all()
    return jsonify([cookie.to_dict() for cookie in cookies])

# Get cookie by id
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

# Post a new Cookie
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
    url = data.get('url')
    if not name or not description or not price or not url:
        return jsonify({"message": "Please fill out all fields"}), 400

    new_cookie = Cookie(
        user_id=current_user.id,
        name=name,
        description=description,
        price=price,
        url = url
    )

    db.session.add(new_cookie)
    db.session.commit()
    return jsonify(new_cookie.to_dict()), 201

# Edit a Cookie
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
    cookie.url = data.get('url', cookie.url)  # Include URL field

    db.session.commit()

    return jsonify(cookie.to_dict()), 200

# Delete a Cookie
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

# Get all reviews for a specific cookie
@cookie_routes.route('/<int:id>/reviews', methods=['GET'])
@login_required
def get_reviews_by_cookie_id(id):
    """
    Returns all reviews for a specific cookie, including the username of the reviewer
    """
    reviews = Review.query.filter_by(cookie_id=id).all()

    if not reviews:
        return jsonify({'message': 'There are no reviews for this cookie'}), 404

    # Build the response including the username from the User model
    reviews_with_user = []
    for review in reviews:
        user = User.query.get(review.user_id)  # Get the user who posted the review
        review_dict = review.to_dict()
        review_dict['username'] = user.username  # Add the username to the review data
        reviews_with_user.append(review_dict)

    return jsonify(reviews_with_user), 200


# Get all reviews for a specific cookie
# @cookie_routes.route('/<int:id>/reviews', methods=['GET'])
# @login_required
# def get_reviews_by_cookie_id(id):
#     """
#     Returns all reviews for a specific cookie
#     """
#     reviews = Review.query.filter_by(cookie_id=id).all()

#     if not reviews:
#         return jsonify({'message': 'There are no reviews for this cookie'}), 404

#     return jsonify([review.to_dict() for review in reviews]), 200

@cookie_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def create_review(id):
    """
    Create a new review for a specific cookie
    """
    data = request.get_json()
    review_text = data.get('review')
    stars = data.get('stars')

    if not review_text or not stars:
        return jsonify({"message": "Please fill out all fields"}), 400

    new_review = Review(
        user_id=current_user.id,
        cookie_id=id,
        review=review_text,
        stars=stars,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    db.session.add(new_review)
    db.session.commit()

    # Include username in the response
    review_dict = new_review.to_dict()
    review_dict['username'] = current_user.username  # Add the username to the review data

    return jsonify(review_dict), 201

# # Post a new review
# @cookie_routes.route('/<int:id>/reviews', methods=['POST'])
# @login_required
# def create_review(id):
#     """
#     Create a new review for a specific cookie
#     """
#     data = request.get_json()
#     review_text = data.get('review')
#     stars = data.get('stars')

#     if not review_text or not stars:
#         return jsonify({"message": "Please fill out all fields"}), 400

#     new_review = Review(
#         user_id=current_user.id,
#         cookie_id=id,
#         review=review_text,
#         stars=stars,
#         created_at=datetime.now(timezone.utc),
#         updated_at=datetime.now(timezone.utc)
#     )

#     db.session.add(new_review)
#     db.session.commit()

#     return jsonify(new_review.to_dict()), 201


# from flask import Blueprint, jsonify, request
# from flask_login import login_required, current_user
# from app.models import db, Cookie
# from datetime import datetime, timezone

# cookie_routes = Blueprint('cookies', __name__)

# #Get All Cookies
# @cookie_routes.route('/', methods=['GET'])
# @login_required
# def get_all_cookies():
#     """
#     Get all cookies that exist in the db
#     """
#     cookies = Cookie.query.all()
#     return jsonify([cookie.to_dict() for cookie in cookies])

# #Get cookie by id
# @cookie_routes.route('/<int:id>', methods=['GET'])
# @login_required
# def get_cookie_by_id(id):
#     """
#     Returns a cookie by specific id
#     """
#     cookie = Cookie.query.get(id)

#     if not cookie:
#         return jsonify({'message': 'Cookie could not be found'}), 404
#     return jsonify(cookie.to_dict()), 200

# #Post a new Cookie
# @cookie_routes.route('/', methods=['POST'])
# @login_required
# def create_cookie():
#     """
#     Create a new cookie
#     """
#     data = request.get_json()
#     name = data.get('name')
#     description = data.get('description')
#     price = data.get('price')

#     if not name or not description or not price:
#         return jsonify({"message": "Please fill out all fields"}), 400


#     new_cookie = Cookie(
#         user_id=current_user.id,
#         name=name,
#         description=description,
#         price=price
#     )

#     db.session.add(new_cookie)
#     db.session.commit()
#     return jsonify(new_cookie.to_dict()), 201

# #Edit a Cookie
# @cookie_routes.route('/<int:id>', methods=['PUT'])
# @login_required
# def edit_cookie(id):
#     """
#     Edit a cookie by id
#     """
#     data = request.get_json()
#     cookie = Cookie.query.get(id)

#     if not cookie:
#         return jsonify({'message': 'Cookie could not be found'}), 404

#     if cookie.user_id != current_user.id:
#         return jsonify({'message': 'Unauthorized'}), 403

#     cookie.name = data.get('name', cookie.name)
#     cookie.description = data.get('description', cookie.description)
#     cookie.price = data.get('price', cookie.price)
#     # cookie.updated_at = datetime.now(timezone.est)

#     db.session.commit()

#     return jsonify(cookie.to_dict()), 200

# #delete a Cookie
# @cookie_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
# def delete_cookie(id):
#     cookie = Cookie.query.get(id)
#     if not cookie:
#         return jsonify({'message': 'Cookie could not be found'}), 404
#     if cookie.user_id != current_user.id:
#         return jsonify({'message': 'Unauthorized'}), 403

#     db.session.delete(cookie)
#     db.session.commit()
#     return jsonify({'message': 'Cookie successfully deleted'}), 200
