from app.models import db, Review, environment, SCHEMA
from datetime import datetime, timezone
from sqlalchemy.sql import text

def seed_reviews():
    review_one = Review(
        user_id=1,
        cookie_id=1,
        review='These semi-sweet chocolate chip cookies are the best you will ever have!',
        stars=5
    )
    review_two = Review(
        user_id=1,
        cookie_id=1,
        review='Perfect sugar cookies for a sweet tooth!',
        stars=4
    )
    review_three = Review(
        user_id=1,
        cookie_id=1,
        review='Everyone will want to lay their hands on these Butterfinger cookies!',
        stars=5
    )

    db.session.add(review_one)
    db.session.add(review_two)
    db.session.add(review_three)

    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
