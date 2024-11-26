from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from projects.views import FacecoldaViewSet
from projects.inspeccion import views as inspeccion_views  
from projects.creacionusuario import views as creacionusuario_views

# Crea el router
router = DefaultRouter()
# Registra el viewset de Facecolda en el router
router.register(r'facecolda', FacecoldaViewSet, basename='facecolda')

# Router para los endpoints relacionados con inspección
inspeccion_router = DefaultRouter()
inspeccion_router.register(r'inspeccion', inspeccion_views.InspeccionViewSet)  # Asegúrate de importar InspeccionViewSet

# Router para endpoints relacionados con usuario
usuario_router = DefaultRouter()
usuario_router.register(r'usuario', creacionusuario_views.UsuarioViewSet)

# Router para endpoints relacionados con poliza
poliza_router = DefaultRouter()
poliza_router.register(r'poliza', creacionusuario_views.PolizaViewSet)

# Router para endpoints relacionados con vehiculo
vehiculo_router = DefaultRouter()
vehiculo_router.register(r'vehiculo', creacionusuario_views.VehiculoViewSet)

# Define las rutas
urlpatterns = [
    path('admin/', admin.site.urls),  # Ruta del admin
    path('api/', include(router.urls)),  # Incluye las rutas de Facecolda
    path('api/', include(inspeccion_router.urls)),  # Incluye las rutas de inspección
    path('api/', include(usuario_router.urls)),  # Incluye las rutas de usuario
    path('api/', include(poliza_router.urls)),  # Incluye las rutas de poliza
    path('api/', include(vehiculo_router.urls)),  # Incluye las rutas de vehiculo
]