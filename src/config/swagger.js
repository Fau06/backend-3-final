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
            { name: 'Users', description: 'API para la gestión de usuarios' },
            { name: 'Pets', description: 'API para la gestión de mascotas' },
            { name: 'Adoption', description: 'API para adopciones' },
            { name: 'Mocks', description: 'API para generación y obtención de datos mock' }
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
                },
                Pet: {
                    type: 'object',
                    required: ['name', 'species'],
                    properties: {
                        _id: { type: 'string', description: 'ID autogenerado por MongoDB.' },
                        name: { type: 'string', description: 'Nombre de la mascota.' },
                        species: { type: 'string', description: 'Especie de la mascota.' },
                        birthDate: { type: 'string', format: 'date', description: 'Fecha de nacimiento.' }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        error: { type: 'string' }
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
                        '200': {
                            description: 'Lista de usuarios obtenida exitosamente.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            status: { type: 'string' },
                                            payload: { type: 'array', items: { $ref: '#/components/schemas/User' } }
                                        }
                                    }
                                }
                            }
                        },
                        '500': { description: 'Error interno del servidor.', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
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
                        '201': { description: 'Usuario creado exitosamente.' },
                        '400': { description: 'Datos incompletos.' },
                        '500': { description: 'Error interno del servidor.' }
                    }
                }
            },
            '/api/pets': {
                get: {
                    summary: 'Obtiene la lista de todas las mascotas.',
                    tags: ['Pets'],
                    responses: {
                        '200': {
                            description: 'Lista de mascotas obtenida exitosamente.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            status: { type: 'string' },
                                            payload: { type: 'array', items: { $ref: '#/components/schemas/Pet' } }
                                        }
                                    }
                                }
                            }
                        },
                        '500': { description: 'Error interno del servidor.', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
                    }
                },
                post: {
                    summary: 'Crea una nueva mascota.',
                    tags: ['Pets'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string' },
                                        species: { type: 'string' },
                                        birthDate: { type: 'string', format: 'date' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '201': { description: 'Mascota creada exitosamente.' },
                        '400': { description: 'Datos incompletos.' },
                        '500': { description: 'Error interno del servidor.' }
                    }
                }
            },
            '/api/adoption/{uid}/{pid}': {
                post: {
                    summary: 'Permite a un usuario adoptar una mascota.',
                    tags: ['Adoption'],
                    parameters: [
                        { name: 'uid', in: 'path', required: true, schema: { type: 'string' }, description: 'ID del usuario.' },
                        { name: 'pid', in: 'path', required: true, schema: { type: 'string' }, description: 'ID de la mascota.' }
                    ],
                    responses: {
                        '200': { description: 'Mascota adoptada exitosamente.' },
                        '400': { description: 'Datos inválidos.' },
                        '404': { description: 'Usuario o mascota no encontrados.' },
                        '500': { description: 'Error interno del servidor.' }
                    }
                }
            },
            '/api/mocks/users': {
                get: {
                    summary: 'Obtiene una lista de usuarios mock generados.',
                    tags: ['Mocks'],
                    responses: {
                        '200': {
                            description: 'Lista de usuarios mock generada exitosamente.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            status: { type: 'string' },
                                            payload: { type: 'array', items: { $ref: '#/components/schemas/User' } }
                                        }
                                    }
                                }
                            }
                        },
                        '500': { description: 'Error interno del servidor.', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
                    }
                }
            },
            '/api/mocks/generateData': {
                post: {
                    summary: 'Genera e inserta usuarios mock en la base de datos.',
                    tags: ['Mocks'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        users: { type: 'integer', description: 'Cantidad de usuarios a generar.' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '201': { description: 'Usuarios generados e insertados exitosamente.' },
                        '400': { description: 'Parámetro inválido.' },
                        '500': { description: 'Error interno del servidor.' }
                    }
                }
            }
        }
    },
    apis: [`${process.cwd()}/src/routes/*.js`],
};

export const specs = swaggerJsdoc(swaggerOptions);