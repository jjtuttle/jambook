from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', first='Demo', last='User', email='demo@aa.io', password='password')  # Owner_id 1
    rock = User(
        username='Rock', first='Rock', last='Roll', email='rock@aa.io', password='password')   # Owner_id 2
    r_b = User(
        username='R_B', first='Rhythm', last='Blues', email='r_b@aa.io', password='password')  # Owner_id 3
    troll = User(
        username='Metal Head', first='Metal', last='Head', email='troll@aa.io', password='password')   # Owner_id 4
    metal = User(
        username='Troller', first='The', last='Troller', email='metal@aa.io', password='password')  # Owner_id 5
    top = User(
        username='Top 40', first='Top', last='40', email='top40@aa.io', password='password')   # Owner_id 6

    db.session.add(demo)
    
    db.session.add(rock)
    db.session.add(r_b)
    db.session.add(troll)
    db.session.add(metal)
    db.session.add(top)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

