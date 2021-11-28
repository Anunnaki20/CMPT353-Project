from django.forms import ModelForm
from .models import dropDownList


class dropDownForm(ModelForm):
    class Meta:
        model = dropDownList
        fields = ['options']
        