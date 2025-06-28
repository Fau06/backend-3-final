import express from 'express';
import mongoose from 'mongoose';
import config from './config/config.js';
import swaggerUiExpress from 'swagger-ui-express';
import { specs } from './config/swagger.js';

// Importar routers
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionRouter from './routes/adoption.router.js';
import mocksRouter from './routes/mocks.router.js';

const app = express();

// Middlewares para interpretar datos de solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a la base de datos
try {
    await mongoose.connect(config.mongoUrl);
    console.log('Base de datos conectada exitosamente.');
} catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    process.exit(1); // Salir si no se puede conectar a la DB
}

// Ruta para la documentación de la API con Swagger
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// Configuración de rutas
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoption', adoptionRouter);
app.use('/api/mocks', mocksRouter);

app.listen(config.port, () => {
    console.log(`Servidor escuchando en el puerto ${config.port}`);
});