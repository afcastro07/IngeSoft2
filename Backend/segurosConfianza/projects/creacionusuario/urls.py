from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InspeccionViewSet

# Crear un router e incluir el viewset de Inspección
router = DefaultRouter()
router.register(r'inspeccion', InspeccionViewSet)  # "inspeccion" es el nombre de tu endpoint

urlpatterns = [
    path('', include(router.urls)),  # Incluir las rutas del router
]