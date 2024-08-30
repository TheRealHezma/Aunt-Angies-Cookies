from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    cookie_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('cookies.id')), nullable=False)
    review = db.Column(db.String, nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationship with lists NEEED TO FIX THIS
    # lists = db.relationship('List', backref='board', lazy=True, cascade="all, delete-orphan")
    #users_in_board = db.relationship('UserInBoard', backref='board', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'cookie_id': self.cookie_id,
            'review': self.review,
            'stars': self.stars,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
