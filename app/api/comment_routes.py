from flask import Blueprint, request
from flask_login import login_required
from app.forms.comment_form import CommentForm
from app.models import Comment, db
from datetime import datetime


# //todo —————————————————————————————————————————————————————————————————————— BP
comment_routes = Blueprint('comment_routes', __name__)


def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field.capitalize()} : {error}')
    return errorMessages


# //todo —————————————————————————————————————————————————————————————————————— NEW COMMENT
# Create a new comment
# //! NEED TO LOOK INTO COMMENT CREATION TO POST_ID???? ******************
@comment_routes.route('/new', methods=['POST'])
@login_required
def create_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = request.json

        new_comment = Comment(
            writer_id=data['writer_id'],
            post_id=data['post_id'],
            comment=data['comment'],
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        db.session.add(new_comment)
        db.session.commit()

        return {**new_comment.to_dict()}  # //! SPLAT NEEDED???? *************

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# //todo ——————————————————————————————————————————————————————————————————————
# get comment for postId


@comment_routes.route('/<int:postId>', methods=['GET'])
def get_comments(postId):
    all_comments = Comment.query.filter(Comment.post_id == int(postId)).all()
<<<<<<< HEAD
    print("\nget comments BE API.....................", all_comments)
=======
    # print("\nget comments BE API.....................", all_comments)
>>>>>>> 6699ea2975b3ec94db4302460c4349b84eff631f
    return {'all_comments': [comment.to_dict() for comment in all_comments]}


# //todo ——————————————————————————————————————————————————————————————————————
# UPDATE Comment


@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_comment(id):
    data = request.json

    # form = CommentForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    comment = Comment.query.get(id)
    comment.comment = data['comment']

    # if form.validate_on_submit():
    #     post = Post.query.get(postId)
    #     post.owner_id = form.data['owner_id']
    #     post.body = form.data['body']
    #     post.updated_at = datetime.now()

    # db.session.commit()
    db.session.commit()
    # return {**post.to_dict()}
    return {'comment': comment.to_dict()}
    # return {'errors': validation_errors_to_error_messages(form.errors)}

# //todo ——————————————————————————————————————————————————————————————————————
# DELETE


@comment_routes.route("/<int:commentId>", methods=['DELETE'])
@login_required
def delete_comment(commentId):
    comment = Comment.query.get(commentId)

    db.session.delete(comment)
    db.session.commit()

    return {'commentId': commentId}
