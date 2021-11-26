from django.db import models

# Create your models here.

class staff(models.Model):
    staff_ID = models.IntegerField(null=False, unique=True)
    firstname = models.CharField(max_length=255, null=False)
    lastname = models.CharField(max_length=255, null=False)
    title = models.CharField(max_length=255, null=False)
    salary = models.IntegerField(null=False)

    def __str__(self):
        return self.firstname

