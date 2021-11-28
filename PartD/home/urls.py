
from django.urls import path
from django.contrib import admin
from . import views


urlpatterns = [
    path('', views.homepage, name='homepage'),
    path('doughnuts/', views.doughnuts, name='doughnuts'),
    path('about/', views.about, name='about'),
    path('profile/', views.userProfile, name='user_profile'),
    path('login/', views.loginPage, name='login'),
    path('logout/', views.logoutCustomer, name='logout'),
    path('register/', views.registerPage, name='register'),
    # path('admin/', admin.site.urls, name='admin'),
]


