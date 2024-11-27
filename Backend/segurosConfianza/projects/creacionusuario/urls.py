from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet

# Crear un router e incluir el viewset de Inspección
router = DefaultRouter()
router.register(r'creacionusuario', UsuarioViewSet)  

urlpatterns = [
    path('', include(router.urls)),  # Incluir las rutas del router
]