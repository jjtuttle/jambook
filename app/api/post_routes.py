from flask import Blueprint, jsonify, request
from flask_login import login_required
import psycopg2
# //TODO:  need post form import to
from app.models import Post, db
from datetime import datetime

# //todo —————————————————————————————————————————————————————————————————————


post_routes = Blueprint('post', __name__)


def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field.capitalize()} : {error}')
    return errorMessages

# //todo ——————————————————————————————————————————————————————————————————————


@post_routes.route('/new', methods=['POST'])
def create_post():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_post = Post(
            owner_id=form.data['owner_id'],
            body=form.data['body'],
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        db.session.add(new_post)
        db.session.commit()
        return {**new_post.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}

# //todo ——————————————————————————————————————————————————————————————————————


@post_routes.route('/all', methods=['GET'])
def get_all_posts():
    all_posts = Post.query.all()

    return {'all_posts': [post.to_dict() for post in all_posts]}

# //todo ——————————————————————————————————————————————————————————————————————


@post_routes.route('/<int:postId>', methods=['GET'])
def get_one_post(postId):
    one_post = Post.query.get(postId)

    return {**one_post.to_dict()}

# //todo ——————————————————————————————————————————————————————————————————————
