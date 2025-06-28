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
3. Crear el archivo `.env` basándose en `.env.example` y configurar las variables.

## Ejecución

- **Modo desarrollo:** `npm start`
- **Ejecutar tests:** `npm test`

## Documentación de la API

La documentación de la API está disponible a través de Swagger UI. Una vez que el servidor esté corriendo, puedes acceder a ella en:
[http://localhost:8080/api-docs](http://localhost:8080/api-docs)

## Imagen de Docker

Este proyecto está dockerizado y la imagen está disponible en Docker Hub.

**Link a la imagen:** `https://hub.docker.com/r/fau06/proyecto-final-backend`