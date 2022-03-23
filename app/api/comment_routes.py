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

        return {**new_comment.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# //todo ——————————————————————————————————————————————————————————————————————

# get ALLcomments


@comment_routes.route('/', methods=['GET'])
def GET_ALL_COMMENT_BY_IDs():
    all_comments = Comment.query.all()
    print("\n\nget comments BE API.....................\n", all_comments)
    print("\n\n")

    return {'all_comments': [comment.to_dict() for comment in all_comments]}

# get comment by ID


@comment_routes.route('/<int:postId>', methods=['GET'])
def get_comment(postId):
    all_comment = Comment.query.filter(Comment.post_id == int(postId)).all()

    return {'all_comment': [comment.to_dict() for comment in all_comment]}


# //todo ——————————————————————————————————————————————————————————————————————
# UPDATE Comment


@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_comment(id):
    data = request.json

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    comment = Comment.query.get(id)
    comment.comment = data['comment']

    if form.validate_on_submit():
        comment = Comment.query.get(id)

        comment.owner_id = form.data['owner_id']
        comment.comment = form.data['comment']
        comment.updated_at = datetime.now()

    db.session.commit()
    return {**comment.to_dict()}
    # return {'comment': comment.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}

# //todo ——————————————————————————————————————————————————————————————————————
# DELETE


@comment_routes.route("/<int:commentId>", methods=['DELETE'])
@login_required
def delete_comment(commentId):
    comment = Comment.query.get(commentId)

    db.session.delete(comment)
    db.session.commit()

    return {'commentId': commentId}
