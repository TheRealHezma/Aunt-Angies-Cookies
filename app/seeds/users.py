from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    users = [
        User(username='Angel', email='orchard.angel3@gmail.com', role='admin'),
        User(username='Hemza', email='hezmam6@gmail.com', role='user'),
        User(username='Pippy Girl', email='piper@gmail.com', role='user'),
        User(username='JohnDoe', email='johndoe@example.com', role='user'),
        User(username='JaneSmith', email='janesmith@example.com', role='user'),
        User(username='CoolBreeze', email='coolbreeze@example.com', role='user'),
        User(username='SkyWatcher', email='skywatcher@example.com', role='user'),
        User(username='MountainHiker', email='mountainhiker@example.com', role='user'),
        User(username='OceanLover', email='oceanlover@example.com', role='user'),
        User(username='TechGuru', email='techguru@example.com', role='user'),
        User(username='GamerX', email='gamerx@example.com', role='user'),
        User(username='ChefMaster', email='chefmaster@example.com', role='user'),
        User(username='HappyCamper', email='happycamper@example.com', role='user'),
        User(username='MovieBuff', email='moviebuff@example.com', role='user'),
        User(username='MusicJunkie', email='musicjunkie@example.com', role='user'),
        User(username='Bookworm', email='bookworm@example.com', role='user'),
        User(username='TravelBug', email='travelbug@example.com', role='user'),
        User(username='FitnessFreak', email='fitnessfreak@example.com', role='user'),
        User(username='CodeNinja', email='codeninja@example.com', role='user'),
        User(username='CryptoKing', email='cryptoking@example.com', role='user'),
        User(username='AIEnthusiast', email='aienthusiast@example.com', role='user'),
        User(username='SpaceExplorer', email='spaceexplorer@example.com', role='user'),
        User(username='NatureLover', email='naturelover@example.com', role='user'),
        User(username='CarFanatic', email='carfanatic@example.com', role='user'),
        User(username='HistoryBuff', email='historybuff@example.com', role='user'),
        User(username='PetLover', email='petlover@example.com', role='user'),
        User(username='ArtCollector', email='artcollector@example.com', role='user'),
        User(username='SportsFan', email='sportsfan@example.com', role='user'),
        User(username='DIYMaster', email='diymaster@example.com', role='user'),
        User(username='AdventureSeeker', email='adventureseeker@example.com', role='user'),
        User(username='EcoWarrior', email='ecowarrior@example.com', role='user'),
        User(username='InvestorPro', email='investorpro@example.com', role='user'),
        User(username='ChessMaster', email='chessmaster@example.com', role='user'),
        User(username='YogaGuru', email='yogaguru@example.com', role='user'),
        User(username='CoffeeAddict', email='coffeeaddict@example.com', role='user')
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
