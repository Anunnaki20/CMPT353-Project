from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout 
from django.contrib.auth.decorators import login_required
from home.models import customer_report as report
from home.forms import UserSignUpForm

def homepage(request):
    return render(request, 'homepage.html')

def doughnuts(request):
    return render(request, 'doughnuts.html')

def about(request):
    return render(request, 'about.html')

@login_required(login_url="login")
def userProfile(request):
    prev_orders = report.objects.filter(customer = request.user)
    context = {'prev_orders' : prev_orders}
    return render(request, 'profile.html', context)


# ---------------------------Login Stuff Below-------------------------------------

def loginPage(request):
    page = 'login'

    # If the user is already logged in and they try to go back to login page, send them to homepage
    if request.user.is_authenticated:
        return redirect('doughnuts')

    if request.method == 'POST':

        # Get the login form data
        username = request.POST.get('username')
        password = request.POST.get('password')

        # Check to make sure that the user is in the database
        try:
            user = User.objects.get(username=username)
        except:
            messages.error(request, 'User does not exist')

        # authenticate the user and log them in
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('doughnuts')
        else:
            messages.error(request, 'Username OR Password does not exist')


    context = {'page' : page}
    return render(request, 'signup_login.html', context)


# Logout the Customer
def logoutCustomer(request):
    logout(request)
    return redirect('login')

# Register a new Customer
def registerPage(request):
    form = UserSignUpForm()
    context = {'form' : form}

    if request.method == 'POST':
        # Send POST data to the UserCreationForm
        form = UserSignUpForm(request.POST)

        # If the form inputs are valid save the user and login them in and send them to the homepage
        # Else display an error
        if form.is_valid():
            user = form.save(commit=False)
            user.save()
            login(request, user)
            return redirect('homepage')
        else:
            messages.error(request, 'Password does not match')


    return render(request, 'signup_login.html', context)
