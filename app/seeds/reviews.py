from app.models import db, Review, environment, SCHEMA
from datetime import datetime, timezone
from sqlalchemy.sql import text

def seed_reviews():
    # Cookie 1: Semi-Sweet Chocolate Chip Cookie (4 reviews)
    review_one = Review(
        user_id=2,
        cookie_id=1,
        review='These semi-sweet chocolate chip cookies are the best you will ever have!',
        stars=5
    )
    review_two = Review(
        user_id=3,
        cookie_id=1,
        review='Perfect sugar cookies for a sweet tooth!',
        stars=4
    )
    review_three = Review(
        user_id=4,
        cookie_id=1,
        review='Everyone will want to lay their hands on these Butterfinger cookies!',
        stars=5
    )
    review_four = Review(
        user_id=5,
        cookie_id=1,
        review='The best cookies for any occasion!',
        stars=5
    )

    # Cookie 2: Butterfinger Cookies (4 reviews)
    review_five = Review(
        user_id=6,
        cookie_id=2,
        review='A delightful crunch with every bite!',
        stars=5
    )
    review_six = Review(
        user_id=7,
        cookie_id=2,
        review='These cookies are perfectly balanced with a sweet and salty taste!',
        stars=4
    )
    review_seven = Review(
        user_id=8,
        cookie_id=2,
        review='I can never stop eating these cookies!',
        stars=5
    )
    review_eight = Review(
        user_id=9,
        cookie_id=2,
        review='Perfect for anyone who loves peanut butter!',
        stars=5
    )

    # Cookie 3: Sugar Cookies (Choc Strawberries) (4 reviews)
    review_nine = Review(
        user_id=10,
        cookie_id=3,
        review='Soft and sweet, the chocolate-covered strawberries are a nice touch!',
        stars=5
    )
    review_ten = Review(
        user_id=11,
        cookie_id=3,
        review='I love how these cookies combine two flavors I adore!',
        stars=4
    )
    review_eleven = Review(
        user_id=12,
        cookie_id=3,
        review='Delicious and refreshing, a must-have for chocolate lovers!',
        stars=5
    )
    review_twelve = Review(
        user_id=13,
        cookie_id=3,
        review='Great for any occasion, I loved the chocolate strawberry combo!',
        stars=5
    )

    # Cookie 4: Sugar Cookies (Ninja Turtles) (4 reviews)
    review_thirteen = Review(
        user_id=14,
        cookie_id=4,
        review='Perfect for kids, and the taste is amazing!',
        stars=5
    )
    review_fourteen = Review(
        user_id=15,
        cookie_id=4,
        review='Fun designs and delicious taste, these are a hit!',
        stars=4
    )
    review_fifteen = Review(
        user_id=16,
        cookie_id=4,
        review='These cookies are my kids’ favorite!',
        stars=5
    )
    review_sixteen = Review(
        user_id=17,
        cookie_id=4,
        review='Great for a themed party, and they taste fantastic!',
        stars=4
    )

    # Cookie 5: Sugar Cookies (V-day) (4 reviews)
    review_seventeen = Review(
        user_id=18,
        cookie_id=5,
        review='A perfect treat for Valentine’s Day!',
        stars=5
    )
    review_eighteen = Review(
        user_id=19,
        cookie_id=5,
        review='Sweet and adorable, these cookies are a must for the season!',
        stars=5
    )
    review_nineteen = Review(
        user_id=20,
        cookie_id=5,
        review='The decoration is lovely, and the taste is on point!',
        stars=4
    )
    review_twenty = Review(
        user_id=21,
        cookie_id=5,
        review='Soft, sweet, and perfect for any V-day celebration!',
        stars=5
    )

    # Cookie 6: Sugar Cookies (Crystals) (4 reviews)
    review_twenty_one = Review(
        user_id=22,
        cookie_id=6,
        review='These cookies are sweet and have a nice crunch with the crystal sugar!',
        stars=5
    )
    review_twenty_two = Review(
        user_id=23,
        cookie_id=6,
        review='Great texture and sweet flavor, love them!',
        stars=4
    )
    review_twenty_three = Review(
        user_id=24,
        cookie_id=6,
        review='The sparkles on top are so pretty, and they taste amazing!',
        stars=5
    )
    review_twenty_four = Review(
        user_id=25,
        cookie_id=6,
        review='The perfect sugar cookie for any occasion!',
        stars=5
    )

    # Cookie 7: Sugar Cookies (Jujutsu K.) (4 reviews)
    review_twenty_five = Review(
        user_id=26,
        cookie_id=7,
        review='Super cool design and great flavor!',
        stars=4
    )
    review_twenty_six = Review(
        user_id=27,
        cookie_id=7,
        review='Loved the Jujutsu Kaisen theme, they taste great too!',
        stars=5
    )
    review_twenty_seven = Review(
        user_id=28,
        cookie_id=7,
        review='Perfectly themed and delicious!',
        stars=5
    )
    review_twenty_eight = Review(
        user_id=29,
        cookie_id=7,
        review='These are the perfect mix of design and taste!',
        stars=4
    )

    # Cookie 8: Sugar Cookies (Pokemon) (4 reviews)
    review_twenty_nine = Review(
        user_id=30,
        cookie_id=8,
        review='A must-have for any Pokemon fan, they taste great!',
        stars=5
    )
    review_thirty = Review(
        user_id=31,
        cookie_id=8,
        review='Super cute cookies, my kids loved them!',
        stars=4
    )
    review_thirty_one = Review(
        user_id=32,
        cookie_id=8,
        review='Fun and delicious!',
        stars=5
    )
    review_thirty_two = Review(
        user_id=33,
        cookie_id=8,
        review='A fun take on sugar cookies, love the flavor!',
        stars=5
    )

    # Add all reviews to the database
    db.session.add_all([
        review_one, review_two, review_three, review_four,
        review_five, review_six, review_seven, review_eight,
        review_nine, review_ten, review_eleven, review_twelve,
        review_thirteen, review_fourteen, review_fifteen, review_sixteen,
        review_seventeen, review_eighteen, review_nineteen, review_twenty,
        review_twenty_one, review_twenty_two, review_twenty_three, review_twenty_four,
        review_twenty_five, review_twenty_six, review_twenty_seven, review_twenty_eight,
        review_twenty_nine, review_thirty, review_thirty_one, review_thirty_two
    ])

    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
