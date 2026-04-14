import { FastifyDynamicSwaggerOptions } from '@fastify/swagger';

export const docs: FastifyDynamicSwaggerOptions = {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Customer & Vehicle Service',
      description: 'API documentation for the Customer & Vehicle microservice',
      version: '1.0.0',
    },
    servers: [{ url: '/', description: 'Current server' }],
    tags: [
      { name: 'customer', description: 'Customer related end-points' },
      { name: 'vehicle', description: 'Vehicle related end-points' },
    ],
  },
};
