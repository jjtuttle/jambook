from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Email, Length, EqualTo
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


def username_length_check(form, field):
    username = field.data
    if len(username) > 40 or len(username) < 4:
        raise ValidationError('Username must be between 4 to 40 characters')


def password_char_error(form, field):
    password = field.data
    if len(password) < 8 or len(password) > 255:
        raise ValidationError('Password must be between 8 and 255 characters')


def f_name_length_check(form, field):
    first = field.data
    if len(first) < 3 or len(first) > 50:
        raise ValidationError('First name must be between 3 and 50 characters')


def l_name_length_check(form, field):
    last = field.data
    if len(last) < 3 or len(last) > 50:
        raise ValidationError('Last name must be between 3 and 50 characters')


class SignUpForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired("Please enter Username"), Length(min=3, max=40, message="Username must be 3-40 characters long"),
                                                   username_exists,
                                                   username_length_check])

    first = StringField('First Name', validators=[
        DataRequired("First Name: Please enter a first name"), Length(min=3, max=50, message="First name must be between 3 to 50 characters")])

    last = StringField('Last Name', validators=[
        DataRequired("Last Name: Please enter a last name"), Length(min=3, max=50, message="Last name must be between 3 to 50 characters")])

    email = StringField('Email', validators=[DataRequired("Email: Please enter an email"), Email(
        "Email must be valid"), user_exists, Length(min=6, max=40, message="Email must be between 6 and 40 characters")])

    password = StringField('Password', validators=[
        DataRequired("Password: Please enter a password"), Length(min=6, max=50, message="Password must be 6-50 characters long"), EqualTo("confirm_password", message="Passwords must match")])

    confirm_password = StringField('Confirm Password', validators=[
        DataRequired("Confirm Password: Please confirm password")])
