import { buildRoute } from '@/main/adapters';
import { customerResponseSchema } from '@/main/docs';
import {
  makeCreateCustomerController,
  makeDeleteCustomerController,
  makeGetAllCustomersController,
  makeGetCustomerByDocumentController,
  makeUpdateCustomerController,
} from '@/main/factories/controllers';
import { FastifyInstance } from 'fastify';

export default async function customerRoutes(fastify: FastifyInstance) {
  fastify.post(
    '',
    {
      schema: {
        summary: 'Create Customer',
        description: 'Creates a new customer. The document (CPF/CNPJ) must be unique.',
        tags: ['customer'],
        body: {
          type: 'object',
          properties: {
            name: { type: 'string', minLength: 2, maxLength: 100 },
            document: { type: 'string', pattern: '^[0-9]{11}$|^[0-9]{14}$' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string', nullable: true, pattern: String.raw`^\+?[0-9]{10,15}$` },
          },
          required: ['name', 'document', 'email'],
        },
        response: {
          201: { description: 'Customer created successfully', ...customerResponseSchema },
          400: { description: 'Bad Request', type: 'object', properties: { message: { type: 'string' } } },
          500: { description: 'Internal Server Error', type: 'object', properties: { error: { type: 'string' } } },
        },
      },
    },
    buildRoute(makeCreateCustomerController()),
  );

  fastify.get(
    '',
    {
      schema: {
        summary: 'List Customers',
        description: 'Retrieves a paginated list of customers with optional filtering.',
        tags: ['customer'],
        querystring: {
          type: 'object',
          properties: {
            page: { type: 'number', default: 1, minimum: 1 },
            limit: { type: 'number', default: 10, minimum: 1, maximum: 100 },
            orderBy: { type: 'string', enum: ['name', 'createdAt'], default: 'createdAt' },
            orderDirection: { type: 'string', enum: ['asc', 'desc'], default: 'asc' },
            name: { type: 'string' },
            document: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
          },
        },
        response: {
          200: {
            description: 'Paginated customer list',
            type: 'object',
            properties: {
              page: { type: 'number' },
              limit: { type: 'number' },
              total: { type: 'number' },
              totalPages: { type: 'number' },
              content: { type: 'array', items: customerResponseSchema },
            },
          },
          500: { description: 'Internal Server Error', type: 'object', properties: { error: { type: 'string' } } },
        },
      },
    },
    buildRoute(makeGetAllCustomersController()),
  );

  fastify.get(
    '/:document',
    {
      schema: {
        summary: 'Get Customer by Document',
        description: 'Retrieves a customer by their CPF or CNPJ.',
        tags: ['customer'],
        params: {
          type: 'object',
          properties: { document: { type: 'string', pattern: '^[0-9]{11}$|^[0-9]{14}$' } },
          required: ['document'],
        },
        response: {
          200: { description: 'Customer found', ...customerResponseSchema },
          404: { description: 'Not found', type: 'object', properties: { error: { type: 'string' } } },
          500: { description: 'Internal Server Error', type: 'object', properties: { error: { type: 'string' } } },
        },
      },
    },
    buildRoute(makeGetCustomerByDocumentController()),
  );

  fastify.patch(
    '/:document',
    {
      schema: {
        summary: 'Update Customer',
        description: 'Updates an existing customer. Only provided fields are updated.',
        tags: ['customer'],
        params: {
          type: 'object',
          properties: { document: { type: 'string', pattern: '^[0-9]{11}$|^[0-9]{14}$' } },
          required: ['document'],
        },
        body: {
          type: 'object',
          properties: {
            name: { type: 'string', minLength: 2, maxLength: 100 },
            document: { type: 'string', pattern: '^[0-9]{11}$|^[0-9]{14}$' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string', nullable: true, pattern: '^\\+?[0-9]{10,15}$' },
          },
        },
        response: {
          200: { description: 'Customer updated', ...customerResponseSchema },
          400: { description: 'Bad Request', type: 'object', properties: { message: { type: 'string' } } },
          404: { description: 'Not found', type: 'object', properties: { error: { type: 'string' } } },
          500: { description: 'Internal Server Error', type: 'object', properties: { error: { type: 'string' } } },
        },
      },
    },
    buildRoute(makeUpdateCustomerController()),
  );

  fastify.delete(
    '/:document',
    {
      schema: {
        summary: 'Delete Customer',
        description: 'Permanently deletes a customer.',
        tags: ['customer'],
        params: {
          type: 'object',
          properties: { document: { type: 'string', pattern: '^[0-9]{11}$|^[0-9]{14}$' } },
          required: ['document'],
        },
        response: {
          204: { description: 'Customer deleted' },
          404: { description: 'Not found', type: 'object', properties: { error: { type: 'string' } } },
          500: { description: 'Internal Server Error', type: 'object', properties: { error: { type: 'string' } } },
        },
      },
    },
    buildRoute(makeDeleteCustomerController()),
  );
}
