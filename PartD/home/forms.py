from django import forms
from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from home.models import customer_report as report
from .models import User


# Custome User creation form
class UserSignUpForm(UserCreationForm):
    email = forms.EmailField(required=True)
    first_name = forms.CharField(required=True)
    last_name = forms.CharField(required=True)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'username', 'password1', 'password2']