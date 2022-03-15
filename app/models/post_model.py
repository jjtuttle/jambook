from app.models.db import db
from datetime import datetime


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    body = db.Column(db.string(255), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False,
                           default=datetime.now())
    updated_at = db.Column(db.DateTime(), nullable=True,
                           default=datetime.now())


# Relationships - one to many | user to posts
users = db.relationship("User", back_populates="posts")


def to_dict(self):
    return {
        "id": self.id,
        "owner_id": self.owner_id,
        "body": self.body,
        "created_at": self.created_at,
        "updated_at": self.updated_at,
        "owner": self.users.username
    }
