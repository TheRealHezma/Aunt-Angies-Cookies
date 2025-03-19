from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

# __table_args__ = (
#     {'schema': SCHEMA} if environment == "production" else None,
#     db.CheckConstraint("role IN ('user', 'admin')", name='check_role'),
# )
# if environment == "production":
#     __table_args__ = (__table_args__[1],{'schema': SCHEMA})
# else:
#     __table_args__ = (__table_args__[1],)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(255), default='user', nullable=False)

    # Table constraints (for role validation)
    # __table_args__ = (
    #     db.CheckConstraint("role IN ('user', 'admin')", name='check_role'),
    # )

 # Relationship with cookie
    cookies = db.relationship('Cookie', backref='user', lazy=True)
    # Relationship with reviews
    reviews = db.relationship('Review', backref='user', lazy=True)


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'role': self.role,
        }
