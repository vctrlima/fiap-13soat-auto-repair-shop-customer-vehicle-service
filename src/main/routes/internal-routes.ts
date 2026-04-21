import { buildRoute } from "@/main/adapters";
import { makeGetCustomerByDocumentController } from "@/main/factories/controllers";
import { FastifyInstance } from "fastify";

/**
 * Internal routes — no JWT authentication required.
 * These routes are called by internal services (e.g., the auth Lambda) via the ALB
 * and must NOT be exposed through the API Gateway to external clients.
 */
export default async function internalRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/customers/:document",
    {
      schema: {
        hide: true,
        params: {
          type: "object",
          properties: {
            document: { type: "string", pattern: "^[0-9]{11}$|^[0-9]{14}$" },
          },
          required: ["document"],
        },
      },
    },
    buildRoute(makeGetCustomerByDocumentController()),
  );
}
