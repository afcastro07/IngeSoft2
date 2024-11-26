# projects/serializers.py
from rest_framework import serializers
from .models import Facecolda

class FacecoldaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Facecolda
        fields = '__all__'  
