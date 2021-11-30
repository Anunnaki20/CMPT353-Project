from django import forms
from django.forms import ModelForm, TextInput, EmailInput, PasswordInput
from django.contrib.auth.forms import UserCreationForm
from home.models import customer_report as report
from .models import User


# Custome User creation form
class UserSignUpForm(UserCreationForm):
    # first_name = forms.CharField(widget=TextInput(attrs={'placeholder': 'First Name', 'style': 'width: 300px;'}))
    # last_name = forms.CharField(widget=TextInput(attrs={'placeholder': 'Last Name', 'style': 'width: 300px;'}))
    # email = forms.EmailField(widget=EmailInput(attrs={'placeholder' :'Email', 'style': 'width: 300px;'}))
    # username = forms.CharField(widget=TextInput(attrs={'placeholder': 'Username', 'style': 'width: 300px;'}))
    # password1 = forms.CharField(widget=PasswordInput(attrs={'placeholder': 'Password', 'type':'password', 'style': 'width: 300px;'}))
    # password2 = forms.CharField(widget=PasswordInput(attrs={'placeholder': 'Confirm Password', 'type':'password', 'style': 'width: 300px;'}))

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'username', 'password1', 'password2']
        # widgets = {
        #     'email': EmailInput(attrs={
        #         'class': "form-control", 
        #         'style': 'max-width: 300px; font-family: Arial, Helvetica, sans-serif; margin: 0.4rem;',
        #         'placeholder': 'Email'
        #     }),
        #     'first_name': TextInput(attrs={
        #         'class': "form-control",
        #         'style': 'max-width: 300px; margin: 0.4rem;',
        #         'placeholder': 'First Name'
        #     }),
        #     'last_name': TextInput(attrs={
        #         'class': "form-control",
        #         'style': 'max-width: 300px; margin: 0.4rem;',
        #         'placeholder': 'Last Name'
        #     }),

        #     'username': TextInput(attrs={
        #         'class': "form-control",
        #         'style': 'max-width: 300px; margin: 0.4rem;',
        #         'placeholder': 'Username'
        #     }),
        # }