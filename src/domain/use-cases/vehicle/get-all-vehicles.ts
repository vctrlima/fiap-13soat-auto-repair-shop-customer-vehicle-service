import { Vehicle } from "@/domain/entities";

export interface GetAllVehicles {
  getAll: (params: GetAllVehicles.Params) => Promise<GetAllVehicles.Result>;
}

export namespace GetAllVehicles {
  export type Params = {
    page: number;
    limit: number;
    orderBy?: string;
    orderDirection?: "asc" | "desc";
    customerId?: string;
    licensePlate?: string;
    brand?: string;
    model?: string;
    year?: number;
  };
  export type Result = {
    content: Vehicle[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
