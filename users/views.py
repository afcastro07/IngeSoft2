from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from .models import User
import json

@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')
            role = data.get('role')

            if User.objects.filter(email=email).exists():
                return JsonResponse({
                    'success': False,
                    'message': 'El correo electrónico ya está registrado'
                }, status=400)

            user = User.objects.create_user(
                email=email,
                password=password,
                role=role
            )

            return JsonResponse({
                'success': True,
                'message': 'Usuario registrado exitosamente',
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'role': user.role
                }
            })
        except Exception as e:
            return JsonResponse({
                'success': False,
                'message': str(e)
            }, status=400)

@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            user = authenticate(email=email, password=password)
            
            if user is not None:
                return JsonResponse({
                    'success': True,
                    'user': {
                        'id': user.id,
                        'email': user.email,
                        'role': user.role
                    }
                })
            else:
                return JsonResponse({
                    'success': False,
                    'message': 'Credenciales inválidas'
                }, status=401)
        except Exception as e:
            return JsonResponse({
                'success': False,
                'message': str(e)
            }, status=400)

@csrf_exempt
def dashboard(request):
    if request.method == 'GET':
        try:
            user_id = request.headers.get('user-id')
            if not user_id:
                return JsonResponse({
                    'success': False,
                    'message': 'No se proporcionó ID de usuario'
                }, status=401)

            user = User.objects.get(id=user_id)
            
            if user.role == 'ASESOR':
                message = "Bienvenido al Panel de Control del Asesor"
            else:
                message = "Bienvenido al Panel de Control del Comprador"

            return JsonResponse({
                'success': True,
                'message': message,
                'role': user.role
            })
        except User.DoesNotExist:
            return JsonResponse({
                'success': False,
                'message': 'Usuario no encontrado'
            }, status=404)
        except Exception as e:
            return JsonResponse({
                'success': False,
                'message': str(e)
            }, status=500)