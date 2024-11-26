from django.db import models

class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    n_identificacion = models.CharField(max_length=20, unique=True)  # Aseguramos que este campo sea único
    tipo_identificacion = models.CharField(max_length=20)
    nombre = models.CharField(max_length=255, null=True, blank=True)
    correo = models.EmailField(max_length=255, null=True, blank=True)
    telefono = models.CharField(max_length=20, null=True, blank=True)
    direccion = models.CharField(max_length=255, null=True, blank=True)
    contraseña = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = 'Usuario'  # Nombre de la tabla en la base de datos
    
    def __str__(self):
        return self.nombre


class Poliza(models.Model):
    identificacion_cliente = models.ForeignKey(
        Usuario, 
        to_field='n_identificacion',  # Relacionamos con 'n_identificacion' en lugar de 'id_usuario'
        on_delete=models.CASCADE
    )
    tipo_cobertura = models.CharField(max_length=100)
    valor_asegurado = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_inicio = models.DateField()
    fecha_caducidad = models.DateField()
    estado = models.CharField(max_length=50)

    class Meta:
        db_table = 'poliza'  # Nombre de la tabla en la base de datos

    def __str__(self):
        return f"Poliza {self.id} - {self.tipo_cobertura}"


class Vehiculo(models.Model):
    identificacion_cliente = models.ForeignKey(
        Usuario, 
        to_field='n_identificacion',  # Relacionamos con 'n_identificacion' en lugar de 'id_usuario'
        on_delete=models.CASCADE
    )
    tipo_vehiculo = models.CharField(max_length=100)
    marca_vehiculo = models.CharField(max_length=100)
    modelo_vehiculo = models.CharField(max_length=100)
    ano_vehiculo = models.CharField(max_length=4)
    placa_vehiculo = models.CharField(max_length=10)
    
    class Meta:
        db_table = 'vehiculo'  # Nombre de la tabla en la base de datos    

    def __str__(self):
        return f"{self.marca_vehiculo} {self.modelo_vehiculo} ({self.ano_vehiculo} {self.placa_vehiculo})"