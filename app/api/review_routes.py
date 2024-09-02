from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Review
from datetime import datetime, timezone

review_routes = Blueprint('reviews', __name__)


# Get review by ID
@review_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_review_by_id(id):
    """
    Returns review by ID
    """
    review = Review.query.get(id)

    if not review:
        return jsonify({'message': 'There are no reviews here'}), 404
    return jsonify(review.to_dict()), 200


# Post a new review
@review_routes.route('/', methods=['POST'])
@login_required
def create_review():
    """
    Create a new review
    """
    data = request.get_json()
    review_text = data.get('review')
    stars = data.get('stars')
    cookie_id = data.get('cookie_id')

    if not review_text or not stars or not cookie_id:
        return jsonify({"message": "Please fill out all fields"}), 400

    new_review = Review(
        user_id=current_user.id,
        cookie_id=cookie_id,
        review=review_text,
        stars=stars,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    db.session.add(new_review)
    db.session.commit()
    return jsonify(new_review.to_dict()), 201


# Edit a review
@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_review(id):
    """
    Edit an existing review
    """
    review = Review.query.get(id)

    if not review:
        return jsonify({"message": "Review not found"}), 404

    if review.user_id != current_user.id:
        return jsonify({"message": "You are not authorized to edit this review"}), 403

    data = request.get_json()
    review_text = data.get('review')
    stars = data.get('stars')

    if not review_text or not stars:
        return jsonify({"message": "Please fill out all fields"}), 400

    review.review = review_text
    review.stars = stars
    review.updated_at = datetime.now(timezone.utc)

    db.session.commit()
    return jsonify(review.to_dict()), 200


# Delete a review
@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    """
    Delete a review
    """
    review = Review.query.get(id)

    if not review:
        return jsonify({"message": "Review not found"}), 404

    if review.user_id != current_user.id:
        return jsonify({"message": "You are not authorized to delete this review"}), 403

    db.session.delete(review)
    db.session.commit()
    return jsonify({"message": "Review deleted"}), 200
