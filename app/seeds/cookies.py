from app.models import db, Cookie, environment, SCHEMA
from sqlalchemy.sql import text

def seed_cookies():
    CookieOne = Cookie(
        user_id=1,
        name='SemiSweet Chocolate Chip Cookies',
        description='The best chocolate chip cookie you will ever have',
        price=10,
        url='https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-6/429670119_260051247147693_4734535354499646369_n.jpg?stp=cp6_dst-jpg&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=t2SFFiwLK9QQ7kNvgG_fCuZ&_nc_ht=scontent-atl3-2.xx&cb_e2o_trans=t&_nc_gid=A-UFz4lxzv2BewW6aXmM08a&oh=00_AYA882VjCDKFu6aCWVXQv_fXVrs2L3jEF0akkx7nnMzumw&oe=66E65CEA'  # Example URL
    )
    CookieTwo = Cookie(
        user_id=1,
        name='Custom Sugar Cookies',
        description='The best cookie for a sweet tooth',
        price=15,
        url='https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-6/422289598_237507592735392_8528519629363469720_n.jpg?stp=cp6_dst-jpg&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=-KlqYtfrhRMQ7kNvgHfm_OG&_nc_ht=scontent-atl3-2.xx&cb_e2o_trans=t&_nc_gid=A0UWbOGXYZgGIxH9cKhVxqt&oh=00_AYCo6J_vmbIow6N9jf_M70dJOs-RJbuTtQvnOERIJs64qg&oe=66E65EC3'  # Example URL
    )
    CookieThree = Cookie(
        user_id=1,
        name='Butterfinger Cookies',
        description='Everyone will want to lay their hands on these butterfingers',
        price=15,
        url='https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-6/422314630_237508206068664_5335019029721357476_n.jpg?stp=cp6_dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=8F_UohAAPoEQ7kNvgFhzl0e&_nc_ht=scontent-atl3-2.xx&cb_e2o_trans=t&_nc_gid=Ahirw4vP0QrH2BsA6p4g6WE&oh=00_AYC7KDskgxq19gxk-S5w34X7rzUL7pB79j3XrUychuqpRA&oe=66E6602B'  # Example URL
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


# from app.models import db, Cookie, environment, SCHEMA
# from datetime import datetime, timezone
# from sqlalchemy.sql import text

# def seed_cookies():
#     CookieOne = Cookie(
#         user_id=1,
#         name='SemiSweet Chocolate Chip Cookies',
#         description='The best chocholate chip cookie you will ever have',
#         price=10
#     )
#     CookieTwo = Cookie(
#         user_id=1,
#         name='Sugar Cookies',
#         description='The best cookie for a sweet tooth',
#         price=15
#     )
#     CookieThree = Cookie(
#         user_id=1,
#         name='Butterfinger Cookies',
#         description='Everone will want to lay their hands on these butterfingers',
#         price=15
#     )

#     db.session.add(CookieOne)
#     db.session.add(CookieTwo)
#     db.session.add(CookieThree)

#     db.session.commit()

# def undo_cookies():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.cookies RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM cookies"))

#     db.session.commit()
