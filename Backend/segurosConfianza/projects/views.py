import json
import os
from rest_framework import viewsets
from rest_framework.response import Response

class FacecoldaViewSet(viewsets.ViewSet):
    def list(self, request):
        # Define la ruta al archivo data.json
        file_path = os.path.join(os.path.dirname(__file__), 'data.json')
        
        # Carga los datos del archivo JSON
        with open(file_path, 'r') as file:
            fake_data = json.load(file)  # Cargar el contenido del archivo JSON
        
        # Retorna los datos leídos como respuesta
        return Response(fake_data)
