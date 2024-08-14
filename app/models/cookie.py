from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone


class Cookie(db.Model):
    __tablename__ = 'cookies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    price = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationship with lists NEEED TO FIX THIS
    # lists = db.relationship('List', backref='board', lazy=True, cascade="all, delete-orphan")
    #users_in_board = db.relationship('UserInBoard', backref='board', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
