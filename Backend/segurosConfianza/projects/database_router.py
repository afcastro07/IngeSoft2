class DatabaseRouter:
    def db_for_read(self, model, **hints):
        """
        Ruta para las lecturas de base de datos según la tabla del modelo.
        """
        # Redirigir las lecturas de las tablas específicas a las bases de datos correspondientes
        if model._meta.db_table == 'ValoresFasecolda':  # Asegúrate de que el nombre de la tabla es correcto
            return 'facecolda'
        if model._meta.db_table == 'Usuario':  # Tabla de usuario
            return 'usuarioPoliza'
        if model._meta.db_table == 'poliza':  # Tabla de poliza
            return 'usuarioPoliza'
        if model._meta.db_table == 'vehiculo':  # Tabla de vehiculo
            return 'usuarioPoliza'
        return 'default'  # Si no corresponde a ninguna de las anteriores, usar la base de datos por defecto

    def db_for_write(self, model, **hints):
        """
        Ruta para las escrituras de base de datos según la tabla del modelo.
        """
        # Redirigir las escrituras a las bases de datos correspondientes
        if model._meta.db_table == 'ValoresFasecolda':  # Asegúrate de que el nombre de la tabla es correcto
            return 'facecolda'
        if model._meta.db_table == 'Usuario':  # Tabla de usuario
            return 'usuarioPoliza'
        if model._meta.db_table == 'poliza':  # Tabla de poliza
            return 'usuarioPoliza'
        if model._meta.db_table == 'vehiculo':  # Tabla de vehiculo
            return 'usuarioPoliza'
        return 'default'  # Si no corresponde a ninguna de las anteriores, usar la base de datos por defecto

    def allow_relation(self, obj1, obj2, **hints):
        """
        Permite las relaciones entre modelos que usan la misma base de datos.
        """
        return True

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Controla en qué base de datos se permiten migraciones para ciertos modelos.
        """
        if db == 'facecolda':
            # Solo migrar los modelos específicos en la base de datos 'facecolda'
            return model_name == 'ValoresFasecolda'
        if db == 'usuarioPoliza':
            # Asegúrate de que los modelos 'usuario', 'poliza' y 'vehiculo' se migren en la base de datos 'usuarioPoliza'
            return model_name in ['usuario', 'poliza', 'vehiculo']
        return db == 'default'  # El resto de los modelos deben usar la base de datos por defecto