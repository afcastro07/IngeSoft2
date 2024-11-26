from rest_framework import viewsets
from .models import Inspeccion
from .serializers import InspeccionSerializer

class InspeccionViewSet(viewsets.ModelViewSet):
    queryset = Inspeccion.objects.all()  # Asegúrate de que este queryset esté correcto
    serializer_class = InspeccionSerializer  # Asegúrate de que el serializador esté configurado correctamente

    def get_queryset(self):
        queryset = super().get_queryset()
        fecha = self.request.query_params.get('fecha')
        lugar = self.request.query_params.get('lugar')
        if fecha:
            queryset = queryset.filter(fecha=fecha)
        if lugar:
            queryset = queryset.filter(lugar=lugar)
        return queryset