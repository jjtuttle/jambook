from app.models import db, Post


# init seed with demo, rock, and r_b users with a posts & comments
def seed_posts():
    second_guitar = Post(
        owner_id=1,
        body="I am looking to buy a guitar as a backup but not want to go over 1k, I will also drop tune it in C or D all the time too."
    )
    bass_player = Post(
        owner_id=2,
        body="Session bass player needed for some track scrubs. If you are into heavy, chugging music then comment with your username so we can contact you."
    )
    drummer_needed = Post(
        owner_id=3,
        body="Three piece jazz band looking for a drummer to play gigs on weekends at local clubs."
    )

    db.session.add(second_guitar)
    db.session.add(bass_player)
    db.session.add(drummer_needed)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the cheatsheets table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
