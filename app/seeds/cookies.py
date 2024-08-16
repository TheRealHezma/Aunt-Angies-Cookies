from app.models import db, Cookie, environment, SCHEMA
from datetime import datetime, timezone
from sqlalchemy.sql import text

def seed_cookies():
    CookieOne = Cookie(
        user_id=1,
        name='SemiSweet Chocolate Chip Cookies',
        description='The best chocholate chip cookie you will ever have',
        price=10
    )
    CookieTwo = Cookie(
        user_id=1,
        name='Sugar Cookies',
        description='The best cookie for a sweet tooth',
        price=15
    )
    CookieThree = Cookie(
        user_id=1,
        name='Butterfinger Cookies',
        description='Everone will want to lay their hands on these butterfingers',
        price=15
    )

    db.session.add(CookieOne)
    db.session.add(CookieTwo)
    db.session.add(CookieThree)

    db.session.commit()

def undo_cookies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cookies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cookies"))

    db.session.commit()
