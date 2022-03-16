from .db import db
from datetime import datetime


class Like(db.Model):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    like_user_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.db"), nullable=False)
    like_count = db.Column(db.Integer, default=0)
    created_at = db.Column(db.Date, nullable=False, default=datetime.now())
    updated_at = db.Column(db.Date, nullable=False, default=datetime.now())


# Relationships
users = db.relationship("User", back_populates="likes")

posts = db.relationship("Post", back_populates="likes")


def to_dict(self):
    return {
        "id": self.id,
        "like_user_id": self.like_id,
        "post_id": self.post_id,
        "created_at": self.created_at,
        "updated_at": self.updated_at,
        "user": {self.user.id: self.users.to_dict()},
        "owner": self.users.username
    }



