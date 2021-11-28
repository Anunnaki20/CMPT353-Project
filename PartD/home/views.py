from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout 
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from home.models import customer_report as report


def homepage(request):
    return render(request, 'homepage.html')


@login_required(login_url="login") # REMOVE WHEN STAFF STUFF IS ADDED
def doughnuts(request):
    return render(request, 'doughnuts.html')


def about(request):
    return render(request, 'about.html')


def userProfile(request):
    prev_orders = report.objects.filter(customer = request.user.username)
    context = {'prev_orders' : prev_orders}
    return render(request, 'profile.html', context)



def loginPage(request):
    page = 'login'
    if request.user.is_authenticated:
        return redirect('homepage')

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
            return redirect('homepage')
        else:
            messages.error(request, 'Username OR Password does not exist')


    context = {'page' : page}
    return render(request, 'signup_login.html', context)


def logoutCustomer(request):
    logout(request)
    return redirect('homepage')


def registerPage(request):
    form = UserCreationForm()
    context = {'form' : form}

    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.save()
            login(request, user)
            return redirect('homepage')
        else:
            messages.error(request, 'An error occured during sign up')


    return render(request, 'signup_login.html', context)
