from app.models.db import db, Comment


# Seed comments to the seeded postgres
def seed_comments():
    second_guitar_comment_1 = Comment(
        writer_id=2,
        post_id=1,
        comment="Probably best bet to go with a mid range 6 string you can find anywhere online or at a store for 200-600 bucks."
    )
    second_guitar_comment_2 = Comment(
        writer_id=3,
        post_id=1,
        comment="I would just git one off craigslist, just make sure to fully play on it through an amp to make sure there are no hidden issues."
    )
    bass_player_comment_1 = Comment(
        writer_id=1,
        post_id=2,
        comment="I would look through the online adds for musicians seeking and post and add there too. Where are you located? I may know a couple cats, but they are all over the US."
    )

    db.session.add(second_guitar_comment_1)
    db.session.add(second_guitar_comment_2)
    db.session.add(bass_player_comment_1)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the comments table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
