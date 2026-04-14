import { buildRoute } from '@/main/adapters';
import { vehicleResponseSchema } from '@/main/docs';
import {
  makeCreateVehicleController,
  makeDeleteVehicleController,
  makeGetAllVehiclesController,
  makeGetVehicleByIdController,
  makeUpdateVehicleController,
} from '@/main/factories/controllers';
import { FastifyInstance } from 'fastify';

export default async function vehicleRoutes(fastify: FastifyInstance) {
  fastify.post(
    '',
    {
      schema: {
        summary: 'Create Vehicle',
        description: 'Registers a new vehicle. License plate must be unique.',
        tags: ['vehicle'],
        body: {
          type: 'object',
          properties: {
            customerId: { type: 'string', format: 'uuid' },
            licensePlate: { type: 'string', maxLength: 7, pattern: '^[A-Z0-9-]+$' },
            brand: { type: 'string', minLength: 2, maxLength: 50 },
            model: { type: 'string', minLength: 1, maxLength: 50 },
            year: { type: 'number', minimum: 1900, maximum: 2030 },
          },
          required: ['customerId', 'licensePlate', 'brand', 'model', 'year'],
        },
        response: {
          201: { description: 'Vehicle created', ...vehicleResponseSchema },
          400: { description: 'Bad Request', type: 'object', properties: { message: { type: 'string' } } },
          500: { description: 'Internal Server Error', type: 'object', properties: { error: { type: 'string' } } },
        },
      },
    },
    buildRoute(makeCreateVehicleController()),
  );

  fastify.get(
    '',
    {
      schema: {
        summary: 'List Vehicles',
        description: 'Retrieves a paginated list of vehicles with optional filtering.',
        tags: ['vehicle'],
        querystring: {
          type: 'object',
          properties: {
            page: { type: 'number', default: 1, minimum: 1 },
            limit: { type: 'number', default: 10, minimum: 1, maximum: 100 },
            orderBy: { type: 'string', enum: ['licensePlate', 'brand', 'model', 'year', 'createdAt'], default: 'createdAt' },
            orderDirection: { type: 'string', enum: ['asc', 'desc'], default: 'asc' },
            customerId: { type: 'string' },
            licensePlate: { type: 'string' },
            brand: { type: 'string' },
            model: { type: 'string' },
            year: { type: 'number' },
          },
        },
        response: {
          200: {
            description: 'Paginated vehicle list',
            type: 'object',
            properties: {
              page: { type: 'number' },
              limit: { type: 'number' },
              total: { type: 'number' },
              totalPages: { type: 'number' },
              content: { type: 'array', items: vehicleResponseSchema },
            },
          },
          500: { description: 'Internal Server Error', type: 'object', properties: { error: { type: 'string' } } },
        },
      },
    },
    buildRoute(makeGetAllVehiclesController()),
  );

  fastify.get(
    '/:id',
    {
      schema: {
        summary: 'Get Vehicle by ID',
        description: 'Retrieves a vehicle by its unique identifier.',
        tags: ['vehicle'],
        params: {
          type: 'object',
          properties: { id: { type: 'string', format: 'uuid' } },
          required: ['id'],
        },
        response: {
          200: { description: 'Vehicle found', ...vehicleResponseSchema },
          404: { description: 'Not found', type: 'object', properties: { error: { type: 'string' } } },
          500: { description: 'Internal Server Error', type: 'object', properties: { error: { type: 'string' } } },
        },
      },
    },
    buildRoute(makeGetVehicleByIdController()),
  );

  fastify.put(
    '/:id',
    {
      schema: {
        summary: 'Update Vehicle',
        description: 'Updates an existing vehicle.',
        tags: ['vehicle'],
        params: {
          type: 'object',
          properties: { id: { type: 'string', format: 'uuid' } },
          required: ['id'],
        },
        body: {
          type: 'object',
          properties: {
            licensePlate: { type: 'string', maxLength: 7 },
            brand: { type: 'string', minLength: 2, maxLength: 50 },
            model: { type: 'string', minLength: 1, maxLength: 50 },
            year: { type: 'number', minimum: 1900, maximum: 2030 },
          },
        },
        response: {
          200: { description: 'Vehicle updated', ...vehicleResponseSchema },
          400: { description: 'Bad Request', type: 'object', properties: { message: { type: 'string' } } },
          404: { description: 'Not found', type: 'object', properties: { error: { type: 'string' } } },
          500: { description: 'Internal Server Error', type: 'object', properties: { error: { type: 'string' } } },
        },
      },
    },
    buildRoute(makeUpdateVehicleController()),
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        summary: 'Delete Vehicle',
        description: 'Permanently deletes a vehicle.',
        tags: ['vehicle'],
        params: {
          type: 'object',
          properties: { id: { type: 'string', format: 'uuid' } },
          required: ['id'],
        },
        response: {
          204: { description: 'Vehicle deleted' },
          404: { description: 'Not found', type: 'object', properties: { error: { type: 'string' } } },
          500: { description: 'Internal Server Error', type: 'object', properties: { error: { type: 'string' } } },
        },
      },
    },
    buildRoute(makeDeleteVehicleController()),
  );
}
