from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    users = [
        User(username='Angel', email='orchard.angel3@gmail.com', role='admin'),
        User(username='Hemza', email='hezmam6@gmail.com', role='user'),
        User(username='Pippy Girl', email='piper@gmail.com', role='user'),
        User(username='John Doe', email='johndoe@example.com', role='user'),
        User(username='Jane Smith', email='janesmith@example.com', role='user'),
        User(username='Cool Breeze', email='coolbreeze@example.com', role='user'),
        User(username='Sky Watcher', email='skywatcher@example.com', role='user'),
        User(username='Mountain Hiker', email='mountainhiker@example.com', role='user'),
        User(username='Ocean Lover', email='oceanlover@example.com', role='user'),
        User(username='Tech Guru', email='techguru@example.com', role='user'),
        User(username='Gamer X', email='gamerx@example.com', role='user'),
        User(username='Chef Master', email='chefmaster@example.com', role='user'),
        User(username='Happy Camper', email='happycamper@example.com', role='user'),
        User(username='Movie Buff', email='moviebuff@example.com', role='user'),
        User(username='Music Junkie', email='musicjunkie@example.com', role='user'),
        User(username='Book Worm', email='bookworm@example.com', role='user'),
        User(username='Travel Bug', email='travelbug@example.com', role='user'),
        User(username='Fitness Freak', email='fitnessfreak@example.com', role='user'),
        User(username='Code Ninja', email='codeninja@example.com', role='user'),
        User(username='Crypto King', email='cryptoking@example.com', role='user'),
        User(username='AI Enthusiast', email='aienthusiast@example.com', role='user'),
        User(username='Space Explorer', email='spaceexplorer@example.com', role='user'),
        User(username='Nature Lover', email='naturelover@example.com', role='user'),
        User(username='Car Fanatic', email='carfanatic@example.com', role='user'),
        User(username='History Buff', email='historybuff@example.com', role='user'),
        User(username='Pet Lover', email='petlover@example.com', role='user'),
        User(username='Art Collector', email='artcollector@example.com', role='user'),
        User(username='Sports Fan', email='sportsfan@example.com', role='user'),
        User(username='DIY Master', email='diymaster@example.com', role='user'),
        User(username='Adventure Seeker', email='adventureseeker@example.com', role='user'),
        User(username='Eco Warrior', email='ecowarrior@example.com', role='user'),
        User(username='Investor Pro', email='investorpro@example.com', role='user'),
        User(username='Chess Master', email='chessmaster@example.com', role='user'),
        User(username='Yoga Guru', email='yogaguru@example.com', role='user'),
        User(username='Coffee Addict', email='coffeeaddict@example.com', role='user'),
        User(username='Gaming Legend', email='gaminglegend@example.com', role='user'),
        User(username='Movie Critic', email='moviecritic@example.com', role='user'),
        User(username='Space Dreamer', email='spacedreamer@example.com', role='user'),
        User(username='Sunset Chaser', email='sunsetchaser@example.com', role='user'),
        User(username='Tech Savvy', email='techsavvy@example.com', role='user'),
        User(username='Mountain Climber', email='mountainclimber@example.com', role='user'),
        User(username='Deep Thinker', email='deepthinker@example.com', role='user'),
        User(username='Food Explorer', email='foodexplorer@example.com', role='user'),
        User(username='Urban Adventurer', email='urbanadventurer@example.com', role='user'),
        User(username='Wildlife Lover', email='wildlifelover@example.com', role='user'),
        User(username='Classic Reader', email='classicreader@example.com', role='user'),
        User(username='Music Addict', email='musicaddict@example.com', role='user'),
        User(username='Road Tripper', email='roadtripper@example.com', role='user'),
        User(username='Tech Tinkerer', email='techtinkerer@example.com', role='user'),
        User(username='Snowboard Pro', email='snowboardpro@example.com', role='user'),
        User(username='Green Thumb', email='greenthumb@example.com', role='user'),
        User(username='Stargazer', email='stargazer@example.com', role='user'),
        User(username='Comic Fan', email='comicfan@example.com', role='user'),
        User(username='Coffee Lover', email='coffeelover@example.com', role='user'),
        User(username='Guitar Player', email='guitarplayer@example.com', role='user')
    ]

    # Set password for all users
    for user in users:
        user.password = "seedUser"  # Automatically hashes password

    for user in users:
        if user.role == 'admin':
            user.password = 'AdminUserBaby69'

    db.session.add_all(users)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
