import * as dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.SERVER_PORT || 3001,
  host: process.env.SERVER_HOST || 'http://localhost:3001',
};
