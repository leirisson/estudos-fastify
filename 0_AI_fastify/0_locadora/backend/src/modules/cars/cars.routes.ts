import type { FastifyInstance } from "fastify";
import { CarsController } from "./cars.controller";
import type { CarsRepository } from "./cars.repository";
import { PrismaCarsRepository } from "./cars.repository";

type CarsRoutesOptions = {
  carsRepository?: CarsRepository;
};

export async function carsRoutes(
  app: FastifyInstance,
  opts: CarsRoutesOptions = {},
) {
  const carsRepository = opts.carsRepository ?? new PrismaCarsRepository();
  const controller = new CarsController(carsRepository);

  app.post("/cars", controller.create);
  app.get("/cars", controller.list);
  app.get("/cars/:id", controller.getById);
  app.patch("/cars/:id", controller.update);
  app.delete("/cars/:id", controller.delete);
}
