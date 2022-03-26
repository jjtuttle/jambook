from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

# //todo ——————————————————————————————————————————————————————————————————————
# todo BE error validate message other than 'An error occurred. Please try again.


def username_length_check(form, field):
    username = field.data
    if len(username) > 40 or len(username) < 4:
        raise ValidationError('Username must be between 4 to 40 characters')


def password_char_error(form, field):
    password = field.data
    if len(password) < 8 or len(password) > 255:
        raise ValidationError('Password must be between 8 and 255 characters')


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(),
                                                   username_exists,
                                                   username_length_check])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[
                           DataRequired(), password_char_error])
