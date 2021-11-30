
from django.urls import path
from django.contrib import admin
from . import views


urlpatterns = [
    path('', views.doughnuts, name='doughnuts'),
    path('doughnuts/', views.doughnuts, name='doughnuts'),
    path('about/', views.about, name='about'),
    path('profile/', views.userProfile, name='user_profile'),
    path('updateprofile/', views.userProfile, name='update_profile'),
    path('login/', views.loginPage, name='login'),
    path('logout/', views.logoutCustomer, name='logout'),
    path('register/', views.registerPage, name='register'),
]


