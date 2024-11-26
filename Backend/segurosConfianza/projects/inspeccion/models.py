from django.db import models

class Inspeccion(models.Model):
    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('rechazada', 'Rechazada'),
        ('aceptada', 'Aceptada'),
    ]

    fecha = models.DateField()
    hora = models.TimeField()
    clienteId = models.IntegerField()
    placa = models.CharField(max_length=20)
    lugar = models.CharField(max_length=100)
    estado = models.CharField(max_length=10, choices=ESTADOS, default='pendiente')

    class Meta:
        db_table = 'inspecciones'  # Esto asegura que la tabla se llame 'inspeccion'
        app_label = 'inspecciones'  # Asegúrate de que el app label sea correcto
        unique_together = ('fecha', 'hora', 'lugar')
    
    def __str__(self):
        return f"Inspección {self.placa} - {self.estado} - {self.fecha}"