from flask import Blueprint
from app.models import Post

search_route = Blueprint('search', __name__)


@search_route.route('/<keyword>')
def do_search(keyword):
    print('api search@@@@@@@@@@@@@@@@@>>>', keyword)
    posts = Post.query.filter(
        Post.body.ilike(f'%{keyword}%')).all()
    post_list = [post.to_dict() for post in posts]

    return {'post_by_body': post_list}
