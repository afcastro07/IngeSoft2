from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User
import json

@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = User.objects.create(
            username=data['username'],
            email=data['email'],
            password=data['password']  # Nota: No almacenar contraseñas en texto plano en producción
        )
        return JsonResponse({'message': 'Usuario registrado exitosamente!'})