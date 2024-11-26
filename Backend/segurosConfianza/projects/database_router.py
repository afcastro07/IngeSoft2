class DatabaseRouter:
    def db_for_read(self, model, **hints):
        """
        Enrutará las lecturas de la tabla 'Facecolda' a la base de datos 'facecolda'.
        """
        if model._meta.db_table == 'ValoresFasecolda':
            return 'facecolda'
        return 'default'  # De lo contrario, usar la base de datos por defecto

    def db_for_write(self, model, **hints):
        """
        Enrutará las escrituras de la tabla 'Facecolda' a la base de datos 'facecolda'.
        """
        if model._meta.db_table == 'ValoresFasecolda':
            return 'facecolda'
        return 'default'

    def allow_relation(self, obj1, obj2, **hints):
        """
        Permite relaciones entre modelos que usan la misma base de datos.
        """
        return True

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Evita que las migraciones se realicen en la base de datos equivocada.
        """
        if db == 'facecolda':
            # Asegúrate de que el modelo 'Facecolda' se migre solo a la base de datos 'facecolda'
            return model_name == 'facecolda'
        return db == 'default'  # El resto de los modelos deben usar la base de datos por defecto