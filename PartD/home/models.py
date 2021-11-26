from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class staff(models.Model):
    firstname = models.CharField(max_length=255, null=False)
    lastname = models.CharField(max_length=255, null=False)
    title = models.CharField(max_length=255, null=False)
    salary = models.IntegerField(null=False)

    def __str__(self):
        return self.firstname + " " + self.lastname + ", " + self.title


class customer_report(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE) # if the User is deleted we delete all the records are deleted for that User
    order_amount = models.IntegerField(null=False)
    report = models.TextField()
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return " Report: " + self.report[0:50]

