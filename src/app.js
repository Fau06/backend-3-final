import express from 'express';
import mongoose from 'mongoose';
import config from './config/config.js';
import swaggerUiExpress from 'swagger-ui-express';
import { specs } from './config/swagger.js';
import logger from './utils/logger.js';
import morgan from 'morgan';

// Importar routers
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionRouter from './routes/adoption.router.js';
import mocksRouter from './routes/mocks.router.js';

const app = express();

// Middlewares para interpretar datos de solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging HTTP
app.use(morgan('dev', { stream: { write: (message) => logger.info(message.trim()) } }));

// Conexión a la base de datos
try {
    await mongoose.connect(config.mongoUrl);
    logger.info('Base de datos conectada exitosamente.');
} catch (error) {
    logger.error('Error al conectar a la base de datos: ' + error.message);
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
    logger.info(`Servidor escuchando en el puerto ${config.port}`);
});

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ error: 'Ocurrió un error interno en el servidor.' });
});