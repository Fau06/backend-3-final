# Proyecto Final - Programación Backend III

Este es el repositorio para el proyecto final del curso, que integra mocking, testing, documentación y dockerización de una API para una aplicación de adopción de mascotas.

## Tecnologías Utilizadas

- Node.js
- Express
- MongoDB (con Mongoose)
- Mocha, Chai, Supertest (para testing)
- Swagger (para documentación)
- Docker

## Instalación

1. Clonar el repositorio: `git clone https://github.com/Fau06/backend-3-final.git`
2. Instalar dependencias: `npm install`

## Ejecución

- **Modo desarrollo:** `npm start`
- **Ejecutar tests:** `npm test`

## Documentación de la API

La documentación de la API está disponible a través de Swagger UI. Una vez que el servidor esté corriendo, puedes acceder a ella en:
[http://localhost:8080/api-docs](http://localhost:8080/api-docs)

## Imagen de Docker

Este proyecto está dockerizado y la imagen está disponible en Docker Hub.

**Link a la imagen:** `https://hub.docker.com/r/fau06/proyecto-final-backend`

## Uso de la imagen Docker

Para ejecutar la imagen Docker y conectar correctamente con tu base de datos MongoDB local, utiliza el siguiente comando:

```bash
docker run -p 8081:8080 -e MONGO_URL=mongodb://host.docker.internal:27017/ecommerce fau06/proyecto-final-backend:latest
```

**¿Por qué se usa `host.docker.internal`?**

Cuando ejecutas el backend dentro de un contenedor Docker, `localhost` hace referencia al propio contenedor, no a tu máquina. Por eso, para que el contenedor pueda conectarse a la base de datos MongoDB que corre en tu PC, debes usar la dirección especial `host.docker.internal`, que le indica al contenedor que se conecte al host (tu computadora).

- El puerto `8081` en tu máquina se mapea al `8080` del contenedor.
- La variable de entorno `MONGO_URL` define la URL de conexión a MongoDB.