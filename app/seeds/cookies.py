from app.models import db, Cookie, environment, SCHEMA
from sqlalchemy.sql import text

def seed_cookies():
    CookieOne = Cookie(
        user_id=1,
        name='SemiSweet Chocolate Chip Cookies',
        description='The best chocolate chip cookie you will ever have',
        price=10,
        url='https://scontent-ord5-3.xx.fbcdn.net/v/t39.30808-6/473062666_467904846362331_6707269692823916487_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=XqowT2VInCMQ7kNvgGJp0sE&_nc_oc=Adj_ct174GTeQ0wrMhwN39gi-C9J_-PCZftVKccvu2oe0FR6PuWHScScIAG6sokJ6NCnKhU6hMGKINkXGca_biQP&_nc_zt=23&_nc_ht=scontent-ord5-3.xx&_nc_gid=AOfJr9Im5GUAf4DlTp-pOGJ&oh=00_AYHK-Ut652E_Z-D9AmW5kiuWlA3kBoyr-dHT28Pp1ZDfVA&oe=67D911A7'
    )
    CookieTwo = Cookie(
        user_id=1,
        name='Custom Sugar Cookies',
        description='The best cookie for a sweet tooth',
        price=15,
        url='https://scontent-ord5-2.xx.fbcdn.net/v/t39.30808-6/472948394_468523289633820_7822669039464841307_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=cNgBBDo8PnAQ7kNvgGVzRzn&_nc_oc=AdjyyOccM6CyN9z8WpefW48FdOeUH-NJnroHxpIPy_ua6WLoay_pt-zNzCWVFuC2vXcpwykCdZR0dj0i75AVKs2A&_nc_zt=23&_nc_ht=scontent-ord5-2.xx&_nc_gid=Aw8hK8sAaATopCD2KnfUP6D&oh=00_AYG2oaqO-d0ORrxP2LsWTdLCro5f9Uxsb_BvcOkGkIuWpQ&oe=67D931A0'
    )
    CookieThree = Cookie(
        user_id=1,
        name='Butterfinger Cookies',
        description='Everyone will want to lay their hands on these butterfingers',
        price=15,
        url='https://scontent-ord5-2.xx.fbcdn.net/v/t39.30808-6/475848575_484243864728429_6024499843878501130_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Hp3WPiCZ4IYQ7kNvgFoJA1E&_nc_oc=AdiQJTixavH9DXaksAIGgCPS2ftiHJJfxGLWWe1UFfVM6qERN_lOkGiPGFWg_KYfwOGt3a3ufgbW5bd7zL6MmKQS&_nc_zt=23&_nc_ht=scontent-ord5-2.xx&_nc_gid=AhmJsKzL2FYnereHlPfnXGD&oh=00_AYFx89v0JyTlE2dVSQzN6DKjIeR-Oj3SXPdisvdQTKYO2Q&oe=67D9291E'
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
