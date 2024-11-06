# Proyecto Integrador: CRUD con Node.js y MySQL

# Plataforma de Streaming - TrailerFlix

## Descripción del Proyecto

En este proyecto, creé una plataforma de streaming llamada TrailerFlix. La aplicación permite realizar operaciones CRUD sobre una base de datos en MySQL que almacena información sobre películas y series. Toda la estructura de datos se basó en un archivo JSON de referencia, trailerflix.json, que contiene detalles sobre cada contenido, desde el título hasta el reparto. Usé este archivo para diseñar un modelo de datos robusto que luego implementé en DB Designer y finalmente exporté a SQL para construir la base de datos en MySQL.

Mi objetivo fue implementar una aplicación funcional con la capacidad de crear, leer, actualizar y eliminar registros en la base de datos, facilitando así la gestión de contenidos multimedia de una plataforma de streaming.

## Caracteristicas

Este proyecto incluye una serie de funcionalidades que cubren todas las operaciones necesarias para gestionar el contenido en una plataforma de streaming. Algunas de estas características incluyen:

1. Lectura Completa de Contenidos: Proporciona un listado de todos los contenidos disponibles en la plataforma, utilizando un endpoint específico para obtener toda la información almacenada.
2. Búsqueda por ID: Permite obtener detalles específicos de una película o serie mediante su ID.
3. Filtrado Personalizado: La aplicación permite filtrar contenidos por atributos como título, género o categoría, lo que facilita la navegación entre el catálogo.
4. Agregar Nuevos Contenidos: Permite agregar nuevos elementos a la base de datos, con validaciones para asegurar que se incluyan los campos necesarios.
5. Actualización y Edición de Contenidos: Facilita la actualización de detalles como el reparto, número de temporadas o la sinopsis.
6. Eliminación de Contenidos: Proporciona una forma segura de eliminar contenidos, con mensajes de error y respuestas específicas si algo falla en el proceso.
7. Manejo de Errores: Los endpoints están diseñados para responder de forma adecuada a cada tipo de error, proporcionando mensajes claros y controlando posibles fallos en la conexión.

## Modelo de Base de Datos

Creé una base de datos llamada `trailerflix`, que incluye las siguientes tablas basadas en la estructura de `trailerflix.json`:

1. **contenido**: Tabla principal que almacena la información de las películas y series.
2. **categorías**: Define si el contenido es una película o una serie.
3. **géneros**: Almacena géneros como Ciencia Ficción, Fantasía, entre otros.
4. **actores**: Contiene información sobre los actores principales de cada contenido.
5. **contenido_actores**: Tabla intermedia para relacionar el contenido con sus actores.
6. **contenido_genero**: Tabla intermedia para relacionar contenido y sus generos.
7. **contenido_categorias**: Tabla intermedia para relacionar contenido y sus categorias.


## Estructura del Proyecto
Para facilitar el desarrollo y mantenimiento, dividí el proyecto en varias carpetas:

- /json: Contiene el archivo trailerflix.json con los datos de películas y series, que usé para diseñar las tablas de la base de datos.
- /conexion/database.js: Archivo que configura la conexión a la base de datos MySQL.
- /models: Contiene los modelos de datos para cada tabla en la base de datos.
- /controllers: Define la lógica para cada endpoint del CRUD.
- /routes: Contiene las rutas para cada función CRUD, vinculadas a los controladores correspondientes.

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


## Documentación hecha con Swagger
Por ultimo realicé una documentación con Swagger que muestra las peticiones HTTP de la API Trailerflix.


## Retos y Aprendizajes
Este proyecto fue una excelente oportunidad para profundizar en el desarrollo backend con Node.js y MySQL. El diseño de la base de datos basado en un archivo JSON fue       
desafiante, ya que requería un enfoque cuidadoso para definir relaciones entre tablas y optimizar el modelo. Además, fue fundamental el manejo adecuado de errores y la 
validación de entradas en cada endpoint.

## Futuras Mejoras
Si continuara desarrollando esta plataforma, algunas ideas para mejorar serían:

Autenticación y Autorización: Añadir autenticación para los usuarios y definir niveles de acceso.
Pagos y Suscripciones: Incorporar un sistema de gestión de suscripciones para ofrecer acceso a contenido premium.
Optimización de Consultas: Refinar las consultas SQL para mejorar el rendimiento en grandes volúmenes de datos.

## Recursos y Referencias
- Documentación de Node.js.
- Documentación de Express.
- Documentación de MySQL.
- DB Designer para el diseño visual de la base de datos.
- Postman para pruebas de endpoints y desarrollo de APIs.

## Agradecimientos
Gracias a los instructores por los conocimientos compartidos durante el desarrollo de este proyecto. También, agradezco el uso de herramientas como DB Designer y Postman, que simplificaron la visualización del modelo de datos y la prueba de los endpoints respectivamente.

