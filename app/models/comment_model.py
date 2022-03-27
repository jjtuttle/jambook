from .db import db
from datetime import datetime


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    writer_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)

    # first = db.Column(db.Integer, db.ForeignKey("users.first"), nullable=False)
    # last = db.Column(db.Integer, db.ForeignKey("users.last"), nullable=False)

    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    comment = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False,
                           default=datetime.now())
    updated_at = db.Column(db.DateTime(), nullable=False,
                           default=datetime.now())

    # Relationships
    users = db.relationship("User", back_populates="comments")

    posts = db.relationship("Post", back_populates="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "writer": self.writer_id,
            "post_id": self.post_id,
            "comment": self.comment,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            # "user": {self.users.id: self.users.to_dict()},
            "owner": self.users.username,
            "first": self.users.first,
            "last": self.users.last
        }
