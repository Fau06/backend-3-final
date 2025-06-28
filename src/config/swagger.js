import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'API de Adopción de Mascotas',
            version: '1.0.0',
            description: 'Documentación de la API para el proyecto final de Backend.',
        },
        tags: [
            {
                name: 'Users',
                description: 'API para la gestión de usuarios'
            }
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    required: ['first_name', 'last_name', 'email', 'password'],
                    properties: {
                        _id: { type: 'string', description: 'ID autogenerado por MongoDB.' },
                        first_name: { type: 'string', description: 'Nombre del usuario.' },
                        last_name: { type: 'string', description: 'Apellido del usuario.' },
                        email: { type: 'string', description: 'Email del usuario (debe ser único).' },
                        role: { type: 'string', description: 'Rol del usuario (user o admin).', enum: ['user', 'admin'] },
                        pets: { type: 'array', items: { type: 'string' }, description: 'Array de IDs de las mascotas del usuario.' }
                    }
                }
            }
        },
        paths: {
            '/api/users': {
                get: {
                    summary: 'Obtiene la lista de todos los usuarios.',
                    tags: ['Users'],
                    responses: {
                        "200": {
                            description: 'Lista de usuarios obtenida exitosamente.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/User'
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            description: 'Error interno del servidor.'
                        }
                    }
                },
                post: {
                    summary: 'Crea un nuevo usuario.',
                    tags: ['Users'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        first_name: { type: 'string' },
                                        last_name: { type: 'string' },
                                        email: { type: 'string' },
                                        password: { type: 'string' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "201": { description: 'Usuario creado exitosamente.' },
                        "400": { description: 'Datos incompletos.' },
                        "500": { description: 'Error interno del servidor.' }
                    }
                }
            }
        }
    },
    apis: [`${process.cwd()}/src/routes/*.js`],
};

export const specs = swaggerJsdoc(swaggerOptions);