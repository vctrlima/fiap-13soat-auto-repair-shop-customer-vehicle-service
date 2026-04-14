export const customerResponseSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    document: { type: 'string' },
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    phone: { type: 'string', nullable: true },
    vehicles: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          licensePlate: { type: 'string' },
          brand: { type: 'string' },
          model: { type: 'string' },
          year: { type: 'number' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time', nullable: true },
        },
      },
    },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time', nullable: true },
  },
};

export const vehicleResponseSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    customer: customerResponseSchema,
    licensePlate: { type: 'string' },
    brand: { type: 'string' },
    model: { type: 'string' },
    year: { type: 'number' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time', nullable: true },
  },
};
