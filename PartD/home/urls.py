
from django.urls import path
from . import views


urlpatterns = [
    path('', views.homepage, name='homepage'),
    path('doughnuts/', views.doughnuts, name='doughnuts'),
    path('about/', views.about, name='about'),
    path('login/', views.loginPage, name='login'),
    path('logout/', views.logoutCustomer, name='logout'),
]


