
from django.contrib import admin
from django.urls import include, path 
from rest_framework.routers import DefaultRouter
from projects.views import FacecoldaViewSet

router = DefaultRouter()
router.register(r'facecolda', FacecoldaViewSet, basename='facecolda')

urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
]
