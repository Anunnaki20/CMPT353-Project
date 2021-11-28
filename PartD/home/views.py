from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout 
from django.contrib.auth.decorators import login_required
from .staff import dropDownForm
#from .models import staff,customer_report


def homepage(request):
    return render(request, 'homepage.html')

@login_required(login_url="login")
def doughnuts(request):
    return render(request, 'doughnuts.html')


def about(request):
    return render(request, 'about.html')

def dropDownView(request):
    form = dropDownForm()
    context = {'form': form}
    return render(request, 'staff_dropdown_list.html', context)
    

def loginPage(request):
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


    context = {}
    return render(request, 'signup_login.html', context)


def logoutCustomer(request):
    logout(request)
    return redirect('homepage')
