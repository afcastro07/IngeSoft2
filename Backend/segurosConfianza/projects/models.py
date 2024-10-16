from django.db import models

class Facecolda(models.Model):
    codigo = models.IntegerField()
    homologoco = models.IntegerField()
    marca = models.CharField(max_length=100)
    referencia1 = models.CharField(max_length=100)
    referencia2 = models.CharField(max_length=100, null=True, blank=True)
    referencia3 = models.CharField(max_length=100, null=True, blank=True)
    um = models.CharField(max_length=50)
    # ... Añadir más campos para otros años ...

    def __str__(self):
        return f"{self.marca} {self.referencia1} {self.referencia2} {self.referencia3}"
