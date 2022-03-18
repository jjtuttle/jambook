from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError


def post_body_length(form, field):
    body = field.data
    if len(body) > 255:
        raise ValidationError('Only 255 characters are allowed')


class PostForm(FlaskForm):
    owner_id = IntegerField('owner_id')
    body = StringField('body', validators=[DataRequired(), post_body_length])

    submit = SubmitField('submit')
