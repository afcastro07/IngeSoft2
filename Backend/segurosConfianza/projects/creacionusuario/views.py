from rest_framework import viewsets
from .models import Usuario, Poliza, Vehiculo
from .serializers import UsuarioSerializer, PolizaSerializer, VehiculoSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class PolizaViewSet(viewsets.ModelViewSet):
    queryset = Poliza.objects.all()
    serializer_class = PolizaSerializer

class VehiculoViewSet(viewsets.ModelViewSet):
    queryset = Vehiculo.objects.all()
    serializer_class = VehiculoSerializer