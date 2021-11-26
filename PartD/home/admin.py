from django.contrib import admin

# Register your models here.

from .models import customer_report, staff

admin.site.register(staff)
admin.site.register(customer_report)