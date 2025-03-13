from app.models import db, Review, environment, SCHEMA
from datetime import datetime, timezone
from sqlalchemy.sql import text

def seed_reviews():
    # Cookie 1: Semi-Sweet Chocolate Chip Cookie (15 reviews)
    review_one = Review(
        user_id=2,  # User ID 2
        cookie_id=1,
        review='These semi-sweet chocolate chip cookies are the best you will ever have!',
        stars=5
    )
    review_two = Review(
        user_id=3,  # User ID 3
        cookie_id=1,
        review='Perfect sugar cookies for a sweet tooth!',
        stars=4
    )
    review_three = Review(
        user_id=4,  # User ID 4
        cookie_id=1,
        review='Everyone will want to lay their hands on these Butterfinger cookies!',
        stars=5
    )
    review_four = Review(
        user_id=5,  # User ID 5
        cookie_id=1,
        review='The best cookies for any occasion!',
        stars=5
    )
    review_five = Review(
        user_id=6,  # User ID 6
        cookie_id=1,
        review='These cookies melt in your mouth!',
        stars=4
    )
    review_six = Review(
        user_id=7,  # User ID 7
        cookie_id=1,
        review='Perfectly baked and so tasty!',
        stars=5
    )
    review_seven = Review(
        user_id=8,  # User ID 8
        cookie_id=1,
        review='Can never get enough of these cookies!',
        stars=4
    )
    review_eight = Review(
        user_id=9,  # User ID 9
        cookie_id=1,
        review='Delicious and soft, a true delight!',
        stars=5
    )
    review_nine = Review(
        user_id=10,  # User ID 10
        cookie_id=1,
        review='Perfect combination of sweet and salty!',
        stars=4
    )
    review_ten = Review(
        user_id=11,  # User ID 11
        cookie_id=1,
        review='A timeless classic, love them!',
        stars=5
    )
    review_eleven = Review(
        user_id=12,  # User ID 12
        cookie_id=1,
        review='Best chocolate chip cookies hands down!',
        stars=5
    )
    review_twelve = Review(
        user_id=13,  # User ID 13
        cookie_id=1,
        review='Simply irresistible!',
        stars=4
    )
    review_thirteen = Review(
        user_id=14,  # User ID 14
        cookie_id=1,
        review='I can eat a whole batch of these in one sitting!',
        stars=5
    )
    review_fourteen = Review(
        user_id=15,  # User ID 15
        cookie_id=1,
        review='Crispy on the outside, soft on the inside. Amazing!',
        stars=4
    )
    review_fifteen = Review(
        user_id=16,  # User ID 16
        cookie_id=1,
        review='These cookies are heaven in every bite!',
        stars=5
    )

    # Cookie 2: Sugar Cookie (5 reviews)
    review_sugar_one = Review(
        user_id=17,  # User ID 17
        cookie_id=2,
        review='Perfect sugar cookies for a sweet tooth!',
        stars=5
    )
    review_sugar_two = Review(
        user_id=18,  # User ID 18
        cookie_id=2,
        review='Soft and sweet, just how I like them!',
        stars=4
    )
    review_sugar_three = Review(
        user_id=19,  # User ID 19
        cookie_id=2,
        review='Great cookies with a nice sweetness!',
        stars=4
    )
    review_sugar_four = Review(
        user_id=20,  # User ID 20
        cookie_id=2,
        review='A classic sugar cookie, simple and delicious!',
        stars=5
    )
    review_sugar_five = Review(
        user_id=21,  # User ID 21
        cookie_id=2,
        review='Just the right amount of sweetness!',
        stars=4
    )

    # Cookie 3: Butterfinger Cookie (10 reviews)
    review_butterfinger_one = Review(
        user_id=2,  # User ID 2
        cookie_id=3,
        review='Everyone will want to lay their hands on these Butterfinger cookies!',
        stars=5
    )
    review_butterfinger_two = Review(
        user_id=3,  # User ID 3
        cookie_id=3,
        review='So buttery and delicious!',
        stars=5
    )
    review_butterfinger_three = Review(
        user_id=4,  # User ID 4
        cookie_id=3,
        review='The perfect balance of sweet and savory!',
        stars=4
    )
    review_butterfinger_four = Review(
        user_id=5,  # User ID 5
        cookie_id=3,
        review='These cookies are a treat for Butterfinger lovers!',
        stars=5
    )
    review_butterfinger_five = Review(
        user_id=6,  # User ID 6
        cookie_id=3,
        review='Crunchy and sweet, what a combo!',
        stars=5
    )
    review_butterfinger_six = Review(
        user_id=7,  # User ID 7
        cookie_id=3,
        review='Love the Butterfinger chunks in these cookies!',
        stars=5
    )
    review_butterfinger_seven = Review(
        user_id=8,  # User ID 8
        cookie_id=3,
        review='These cookies have the best texture!',
        stars=4
    )
    review_butterfinger_eight = Review(
        user_id=9,  # User ID 9
        cookie_id=3,
        review='They taste just like the candy bar!',
        stars=4
    )
    review_butterfinger_nine = Review(
        user_id=10,  # User ID 10
        cookie_id=3,
        review='Such a fun and tasty cookie!',
        stars=5
    )
    review_butterfinger_ten = Review(
        user_id=11,  # User ID 11
        cookie_id=3,
        review='A must-try for anyone who loves Butterfingers!',
        stars=4
    )

    # Adding all reviews to the session
    db.session.add_all([review_one, review_two, review_three, review_four, review_five, review_six, review_seven, review_eight, review_nine, review_ten,
                        review_eleven, review_twelve, review_thirteen, review_fourteen, review_fifteen,
                        review_sugar_one, review_sugar_two, review_sugar_three, review_sugar_four, review_sugar_five,
                        review_butterfinger_one, review_butterfinger_two, review_butterfinger_three, review_butterfinger_four, review_butterfinger_five,
                        review_butterfinger_six, review_butterfinger_seven, review_butterfinger_eight, review_butterfinger_nine, review_butterfinger_ten])

    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
