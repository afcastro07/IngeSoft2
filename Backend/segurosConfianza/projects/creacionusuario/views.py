from rest_framework import viewsets
from .models import Usuario, Poliza, Vehiculo
from rest_framework.decorators import action
from .serializers import UsuarioSerializer, PolizaSerializer, VehiculoSerializer
from rest_framework.response import Response
from rest_framework import status

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class PolizaViewSet(viewsets.ModelViewSet):
    queryset = Poliza.objects.all()
    serializer_class = PolizaSerializer

class VehiculoViewSet(viewsets.ModelViewSet):
    queryset = Vehiculo.objects.all()
    serializer_class = VehiculoSerializer
    
    @action(detail=False, methods=['post'], url_path='login')
    def login(self, request):
        """
        Verifica si el correo y la contraseña coinciden con los registros de la base de datos
        y autentica al usuario.
        """
        correo = request.data.get('correo')
        contraseña = request.data.get('contraseña')

        if not correo or not contraseña:
            return Response({'detail': 'Correo y Contraseña son requeridos'}, status=status.HTTP_400_BAD_REQUEST)

        # Verificamos si el usuario existe en la base de datos
        try:
            usuario = Usuario.objects.get(correo=correo)
        except Usuario.DoesNotExist:
            return Response({'detail': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        # Verificamos si la contraseña coincide
        if usuario.contraseña != contraseña:
            return Response({'detail': 'Contraseña incorrecta'}, status=status.HTTP_400_BAD_REQUEST)

        # Si todo está bien, retornamos los datos del usuario
        return Response({
            'message': 'Inicio de sesión exitoso',
            'usuario': {
                'id_usuario': usuario.id_usuario,
                'nombre': usuario.nombre,  # Nombre del usuario
                'correo': usuario.correo,
                'telefono': usuario.telefono,
                'direccion': usuario.direccion,
                'fecha_registro': usuario.fecha_registro
            }
        }, status=status.HTTP_200_OK)