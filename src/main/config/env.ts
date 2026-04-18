import * as dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  SERVER_PORT: z.coerce.number().default(3001),
  SERVER_HOST: z.string().default("http://localhost:3001"),
  CORS_ORIGIN: z.string().optional(),
  JWT_ACCESS_TOKEN_SECRET: z.string().optional(),
});

const parsed = envSchema.parse(process.env);

export default {
  port: parsed.SERVER_PORT,
  host: parsed.SERVER_HOST,
  corsOrigin: parsed.CORS_ORIGIN,
  jwtSecret: parsed.JWT_ACCESS_TOKEN_SECRET,
};
