from app.models import db, Cookie, environment, SCHEMA
from sqlalchemy.sql import text

def seed_cookies():
    cookies = [
        Cookie(user_id=1, name='SemiSweet Chocolate Chip Cookies',
               description='A perfect balance of rich chocolate and buttery dough, delivering the ultimate classic cookie experience.',
               price=10, url='https://scontent-ord5-3.xx.fbcdn.net/v/t39.30808-6/473062666_467904846362331_6707269692823916487_n.jpg'),

        Cookie(user_id=1, name='Butterfinger Cookies',
               description='A delightful crunch with every bite, packed with peanut buttery Butterfinger pieces for a sweet and salty treat.',
               price=15, url='https://scontent-ord5-2.xx.fbcdn.net/v/t39.30808-6/475848575_484243864728429_6024499843878501130_n.jpg'),

        Cookie(user_id=1, name='Sugar Cookies (Choc Strawberries)',
               description='Soft and sweet sugar cookies with a charming chocolate-covered strawberry design, offering the same classic taste with a unique look.',
               price=15, url='https://scontent-ord5-2.xx.fbcdn.net/v/t39.30808-6/472948394_468523289633820_7822669039464841307_n.jpg'),

        Cookie(user_id=1, name='Sugar Cookies (Ninja Turtles)',
               description='Classic sugar cookies decorated with a fun Ninja Turtles theme, delivering the same delicious taste with a heroic twist.',
               price=12, url='https://scontent-ord5-2.xx.fbcdn.net/v/t39.30808-6/472939310_467904429695706_6329666910568247117_n.jpg'),

        Cookie(user_id=1, name='Sugar Cookies (V-day)',
               description='Soft, sweet sugar cookies decorated for Valentine’s Day, offering the same delightful flavor with a festive design.',
               price=14, url='https://scontent-ord5-2.xx.fbcdn.net/v/t39.30808-6/472939310_467904429695706_6329666910568247117_n.jpg'),

        Cookie(user_id=1, name='Sugar Cookies (Crystals)',
               description='Classic sugar cookies topped with crystal sugar decorations for a sparkling finish, keeping the same beloved taste.',
               price=16, url='https://scontent-ord5-2.xx.fbcdn.net/v/t39.30808-6/472911122_467904909695658_4755028742313988095_n.jpg'),

        Cookie(user_id=1, name='Sugar Cookies (Jujutsu K.)',
               description='Sugar cookies featuring Jujutsu Kaisen-themed designs, with the same sweet and satisfying flavor in every bite.',
               price=10, url='https://scontent-ord5-1.xx.fbcdn.net/v/t39.30808-6/472986720_467904426362373_5416806116488273366_n.jpg'),

        Cookie(user_id=1, name='Sugar Cookies (Pokemon)',
               description='Classic sugar cookies adorned with colorful Pokémon designs, bringing a playful touch to the same delicious treat.',
               price=15, url='https://scontent-ord5-3.xx.fbcdn.net/v/t39.30808-6/472846716_466403139845835_6553316666706487949_n.jpg'),

        Cookie(user_id=1, name='Sugar Cookies (Brunch)',
               description='A sweet and simple sugar cookie decorated with a charming brunch theme, offering the same great taste.',
               price=18, url='https://scontent-ord5-2.xx.fbcdn.net/v/t39.30808-6/470186342_448395458313270_7154071342883051758_n.jpg'),

        Cookie(user_id=1, name='Sugar Cookies (Divorce Party)',
               description='Sugar cookies with a bold and humorous design, providing the same delicious flavor for a fun celebration.',
               price=14, url='https://www.facebook.com/photo.php?fbid=163207190165433&set=pb.100094284582480.-2207520000&type=3'),

        Cookie(user_id=1, name='Sugar Cookies (Spring)',
               description='Soft sugar cookies decorated with a floral spring theme, bringing seasonal charm to the same sweet flavor.',
               price=17, url='https://scontent-ord5-3.xx.fbcdn.net/v/t39.30808-6/470183122_448973831588766_879243890191735750_n.jpg'),

        Cookie(user_id=1, name='Sugar Cookies (Summer)',
               description='Bright and cheerful sugar cookies with a summer-inspired design, offering the same classic sweetness.',
               price=13, url='https://scontent-ord5-1.xx.fbcdn.net/v/t39.30808-6/470128669_448346774984805_9193107728823721414_n.jpg'),

        Cookie(user_id=1, name='Sugar Cookies (Fall)',
               description='Cozy and warm sugar cookies decorated with a fall theme, keeping the same delightful taste of the season.',
               price=12, url='https://scontent-ord5-1.xx.fbcdn.net/v/t39.30808-6/470157862_448690441617105_3583060106528525233_n.jpg'),

        Cookie(user_id=1, name='Sugar Cookies (Winter)',
               description='Classic sugar cookies with a winter-inspired design, offering the same sweet experience with a seasonal touch.',
               price=16, url='https://scontent-ord5-2.xx.fbcdn.net/v/t39.30808-6/472740534_465786969907452_3946661548782503203_n.jpg'),
    ]

    db.session.add_all(cookies)
    db.session.commit()

def undo_cookies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cookies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cookies"))

    db.session.commit()
