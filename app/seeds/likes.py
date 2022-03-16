from app.models.db import db, Like


# seed data for Likes
def seed_likes():
    second_guitar_like_1 = Like(
        like_user_id=3,
        post_id=3,
        like_count=1
    )

    db.session.add(second_guitar_like_1)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the comments table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities


def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
