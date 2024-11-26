from rest_framework import serializers
from .models import Usuario, Poliza, Vehiculo

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__' 
class PolizaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poliza
        fields = '__all__'  

class VehiculoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehiculo
        fields = '__all__' 