import { Counter, Histogram, Meter, metrics } from "@opentelemetry/api";

const meter: Meter = metrics.getMeter("customer-vehicle-service");

export const httpRequestCounter: Counter = meter.createCounter(
  "http.server.request.count",
  { description: "Total number of HTTP requests" },
);

export const httpRequestDuration: Histogram = meter.createHistogram(
  "http.request.duration",
  { description: "HTTP request duration in milliseconds", unit: "ms" },
);

export const customerCreatedCounter: Counter = meter.createCounter(
  "business.customer.created",
  { description: "Total number of customers created" },
);

export const vehicleCreatedCounter: Counter = meter.createCounter(
  "business.vehicle.created",
  { description: "Total number of vehicles created" },
);

export const dbQueryDuration: Histogram = meter.createHistogram(
  "db.query.duration",
  { description: "Database query duration in milliseconds", unit: "ms" },
);

export const dbQueryErrorCounter: Counter = meter.createCounter(
  "db.query.error.count",
  { description: "Total number of database query errors" },
);
