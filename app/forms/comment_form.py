from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError, Length


def comment_length(form, field):
    comment = field.data
    if len(comment) < 5 or len(comment) > 255:
        raise ValidationError(
            'Please provide a comment between 5 chars and 255 chars.')


class CommentForm(FlaskForm):
    writer_id = IntegerField('writer_id')
    post_id = IntegerField('post_id')
    comment = StringField('comment', validators=[DataRequired(), Length(
        min=2, max=255, message="Comments must be between 2 and 255 characters")]),

    submit = SubmitField('submit')
