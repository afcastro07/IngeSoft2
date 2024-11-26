from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Facecolda
from .serializers import FacecoldaSerializer

class FacecoldaViewSet(viewsets.ViewSet):
    def list(self, request):
        try:
            # Consulta todos los registros de la tabla 'ValoresFasecolda'
            facecolda_data = Facecolda.objects.all()

            # Si no hay registros, devolver una respuesta con un mensaje
            if not facecolda_data.exists():
                return Response({'detail': 'No records found.'}, status=status.HTTP_404_NOT_FOUND)

            # Serializa los datos obtenidos de la base de datos
            serializer = FacecoldaSerializer(facecolda_data, many=True)

            # Devolver la respuesta con los datos serializados
            return Response(serializer.data)

        except Exception as e:
            # Si ocurre un error, devolver una respuesta con el error
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)