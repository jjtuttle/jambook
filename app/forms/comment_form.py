from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError


def comment_length(form, field):
    comment = field.data
    if len(comment) > 255:
        raise ValidationError('Only 255 characters are allowed')


class CommentForm(FlaskForm):
    writer_id = IntegerField('writer_id')
    post_id = IntegerField('post_id')
    comment = StringField('comment', validators=[DataRequired(),
                                                 comment_length])

    submit = SubmitField('submit')
