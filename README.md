# Proyecto Integrador: CRUD con Node.js y MySQL

# Plataforma de Streaming - TrailerFlix

## Descripción del Proyecto

En este proyecto, desarrollé una plataforma de streaming utilizando Node.js y MySQL, con la finalidad de implementar un CRUD (Crear, Leer, Actualizar, Eliminar) en una base de datos relacional. La aplicación permite gestionar contenido de la plataforma (películas y series) tomando como referencia el archivo `trailerflix.json` para diseñar el modelo de datos.


## Modelo de Base de Datos

Creé una base de datos llamada `trailerflix`, que incluye las siguientes tablas basadas en la estructura de `trailerflix.json`:

1. **contenido**: Tabla principal que almacena la información de las películas y series.
2. **categorías**: Define si el contenido es una película o una serie.
3. **géneros**: Almacena géneros como Ciencia Ficción, Fantasía, entre otros.
4. **actores**: Contiene información sobre los actores principales de cada contenido.
5. **contenido_actores**: Tabla intermedia para relacionar el contenido con sus actores.
6. **contenido_genero**: Tabla intermedia para relacionar contenido y sus generos.
7. **contenido_categorias**: Tabla intermedia para relacionar contenido y sus categorias.


## Funcionalidades del CRUD

1. **Obtener todos los contenidos**
   - Desarrollé un endpoint para recuperar todos los contenidos de la base de datos.
   - Agregué control de errores para manejar la indisponibilidad de la base de datos.

2. **Obtener un contenido por ID**
   - Creé un endpoint para recuperar un contenido específico por su ID.
   - Implementé control de errores para manejar casos en que el contenido no exista.

3. **Filtrar contenidos**
   - Desarrollé un endpoint para filtrar por título, género o categoría.
   - Agregué control de errores para manejar coincidencias no encontradas o problemas de conexión.

4. **Agregar un nuevo contenido**
   - Implementé un endpoint para añadir un nuevo contenido (película o serie).
   - Incluí validación de campos obligatorios.

5. **Actualizar un contenido**
   - Creé un endpoint para actualizar información como temporadas o reparto.
   - Agregué control de errores para manejar actualizaciones fallidas.

6. **Eliminar un contenido**
   - Implementé un endpoint para eliminar un contenido de la base de datos.
   - Incluí control de errores para manejar problemas durante el borrado.

7. **Control de errores general**
   - Manejé los errores en la estructura de solicitudes y respuestas.
   - Configuré respuestas con mensajes y códigos de error específicos.
   - Gestioné las rutas inexistentes con respuestas adecuadas.

## Tecnologías Utilizadas
   - **Node.js**: Utilizado como entorno de ejecución de JavaScript en el servidor.
   - **Express.js**: Framework para Node.js que facilita la creación de servidores y manejo de rutas.
   - **MySQL**: Sistema de gestión de bases de datos relacional utilizado para almacenar los datos de la plataforma.
   - **DB Designer**: Herramienta para modelar visualmente la base de datos y exportar su esquema.
   - **Postman**: Utilizado para probar los endpoints del CRUD y verificar el funcionamiento de las rutas.
   - **Inteligencia Artificial**: Asistió en la transformación y optimización de los datos en trailerflix.json para su inserción en MySQL.

   ## Pruebas
   Para probar la funcionalidad de la aplicación, utilicé Postman y desarrollé una serie de pruebas de integración que abarcan:

   - Pruebas de Creación: Verificar la correcta inserción de nuevos contenidos en la base de datos.
   - Pruebas de Lectura: Comprobar que los contenidos existentes se obtienen de manera precisa.
   - Pruebas de Actualización: Evaluar que las modificaciones de datos (por ejemplo, temporadas y reparto) se realizan sin problemas.
   - Pruebas de Eliminación: Asegurar que el contenido seleccionado se elimina correctamente y no produce errores.

   ## Recursos y Referencias
   - Documentación de Node.js.
   - Documentación de Express.
   - Documentación de MySQL.
   - DB Designer para el diseño visual de la base de datos.
   - Postman para pruebas de endpoints y desarrollo de APIs.

   ## Documentación hecha con Swagger
   Por ultimo realicé una documentación con Swagger que muestra las peticiones HTTP de la API Trailerflix.