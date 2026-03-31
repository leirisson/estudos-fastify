"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/modules/cars/cars.routes.ts
var cars_routes_exports = {};
__export(cars_routes_exports, {
  carsRoutes: () => carsRoutes
});
module.exports = __toCommonJS(cars_routes_exports);

// src/modules/cars/cars.schema.ts
var import_zod = __toESM(require("zod"));
var createCarSchema = import_zod.default.object({
  brand: import_zod.default.string().min(1),
  model: import_zod.default.string().min(1),
  version: import_zod.default.string().min(1).optional(),
  year: import_zod.default.number().min(1950),
  price: import_zod.default.number().positive(),
  fuel: import_zod.default.string().min(1),
  transmission: import_zod.default.string().min(1),
  mileage: import_zod.default.number().positive().optional(),
  imageUrl: import_zod.default.string().optional()
});
var updateCarSchema = createCarSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided"
});
var carIdParamSchema = import_zod.default.object({
  id: import_zod.default.string().uuid()
});

// src/modules/cars/cars.use.case.ts
var CarNotFoundError = class extends Error {
  constructor() {
    super("Car not found");
  }
};
var CreateCarUseCase = class {
  constructor(carsRepository) {
    this.carsRepository = carsRepository;
  }
  async execute(input) {
    return this.carsRepository.create(input);
  }
};
var ListCarsUseCase = class {
  constructor(carsRepository) {
    this.carsRepository = carsRepository;
  }
  async execute() {
    return this.carsRepository.findMany();
  }
};
var GetCarByIdUseCase = class {
  constructor(carsRepository) {
    this.carsRepository = carsRepository;
  }
  async execute(input) {
    const car = await this.carsRepository.findById(input.id);
    if (!car) throw new CarNotFoundError();
    return car;
  }
};
var UpdateCarUseCase = class {
  constructor(carsRepository) {
    this.carsRepository = carsRepository;
  }
  async execute(input) {
    const car = await this.carsRepository.update(input);
    if (!car) throw new CarNotFoundError();
    return car;
  }
};
var DeleteCarUseCase = class {
  constructor(carsRepository) {
    this.carsRepository = carsRepository;
  }
  async execute(input) {
    const deleted = await this.carsRepository.delete(input.id);
    if (!deleted) throw new CarNotFoundError();
  }
};

// src/modules/cars/cars.controller.ts
function omitUndefined(data) {
  const entries = Object.entries(data).filter(([, value]) => value !== void 0);
  return Object.fromEntries(entries);
}
function badRequest(reply, message) {
  return reply.status(400).send({ message });
}
function notFound(reply, message) {
  return reply.status(404).send({ message });
}
var CarsController = class {
  constructor(carsRepository) {
    this.carsRepository = carsRepository;
  }
  create = async (request, reply) => {
    const parsed = createCarSchema.safeParse(request.body);
    if (!parsed.success) return badRequest(reply, "Invalid payload");
    const useCase = new CreateCarUseCase(this.carsRepository);
    const { brand, model, year, price, fuel, transmission, ...optional } = parsed.data;
    const car = await useCase.execute({
      brand,
      model,
      year,
      price,
      fuel,
      transmission,
      ...omitUndefined(optional)
    });
    return reply.status(201).send(car);
  };
  list = async (_request, reply) => {
    const useCase = new ListCarsUseCase(this.carsRepository);
    const cars = await useCase.execute();
    return reply.status(200).send(cars);
  };
  getById = async (request, reply) => {
    const params = carIdParamSchema.safeParse(request.params);
    if (!params.success) return badRequest(reply, "Invalid id");
    const useCase = new GetCarByIdUseCase(this.carsRepository);
    try {
      const car = await useCase.execute({ id: params.data.id });
      return reply.status(200).send(car);
    } catch (err) {
      if (err instanceof CarNotFoundError) return notFound(reply, err.message);
      throw err;
    }
  };
  update = async (request, reply) => {
    const params = carIdParamSchema.safeParse(request.params);
    if (!params.success) return badRequest(reply, "Invalid id");
    const body = updateCarSchema.safeParse(request.body);
    if (!body.success) return badRequest(reply, "Invalid payload");
    const useCase = new UpdateCarUseCase(this.carsRepository);
    try {
      const car = await useCase.execute({
        id: params.data.id,
        ...omitUndefined(body.data)
      });
      return reply.status(200).send(car);
    } catch (err) {
      if (err instanceof CarNotFoundError) return notFound(reply, err.message);
      throw err;
    }
  };
  delete = async (request, reply) => {
    const params = carIdParamSchema.safeParse(request.params);
    if (!params.success) return badRequest(reply, "Invalid id");
    const useCase = new DeleteCarUseCase(this.carsRepository);
    try {
      await useCase.execute({ id: params.data.id });
      return reply.status(204).send();
    } catch (err) {
      if (err instanceof CarNotFoundError) return notFound(reply, err.message);
      throw err;
    }
  };
};

// src/modules/cars/cars.repository.ts
function toDomain(car) {
  const year = Number.parseInt(car.year, 10);
  const base = {
    id: car.id,
    brand: car.brand,
    model: car.model,
    year: Number.isFinite(year) ? year : 0,
    price: car.price,
    fuel: car.flue,
    transmission: car.transmission
  };
  return {
    ...base,
    ...car.version.length > 0 ? { version: car.version } : {},
    ...car.mileage > 0 ? { mileage: car.mileage } : {},
    ...car.imgUrl.length > 0 ? { imageUrl: car.imgUrl } : {}
  };
}
var PrismaCarsRepository = class {
  async prisma() {
    const prismaModulePath = "../../infra/prisma/index.js";
    const { default: prisma } = await import(prismaModulePath);
    return prisma;
  }
  async create(data) {
    const prisma = await this.prisma();
    const created = await prisma.car.create({
      data: {
        brand: data.brand,
        model: data.model,
        version: data.version ?? "",
        year: String(data.year),
        price: data.price,
        flue: data.fuel,
        transmission: data.transmission,
        mileage: data.mileage ?? 0,
        imgUrl: data.imageUrl ?? ""
      }
    });
    return toDomain(created);
  }
  async findMany() {
    const prisma = await this.prisma();
    const cars = await prisma.car.findMany({ orderBy: { createAt: "desc" } });
    return cars.map(toDomain);
  }
  async findById(id) {
    const prisma = await this.prisma();
    const car = await prisma.car.findUnique({ where: { id } });
    return car ? toDomain(car) : null;
  }
  async update(data) {
    const prisma = await this.prisma();
    const current = await prisma.car.findUnique({ where: { id: data.id } });
    if (!current) return null;
    const updated = await prisma.car.update({
      where: { id: data.id },
      data: {
        brand: data.brand,
        model: data.model,
        version: data.version,
        year: data.year !== void 0 ? String(data.year) : void 0,
        price: data.price,
        flue: data.fuel,
        transmission: data.transmission,
        mileage: data.mileage,
        imgUrl: data.imageUrl
      }
    });
    return toDomain(updated);
  }
  async delete(id) {
    const prisma = await this.prisma();
    const current = await prisma.car.findUnique({ where: { id } });
    if (!current) return false;
    await prisma.car.delete({ where: { id } });
    return true;
  }
};

// src/modules/cars/cars.routes.ts
async function carsRoutes(app, opts = {}) {
  const carsRepository = opts.carsRepository ?? new PrismaCarsRepository();
  const controller = new CarsController(carsRepository);
  app.post("/cars", controller.create);
  app.get("/cars", controller.list);
  app.get("/cars/:id", controller.getById);
  app.patch("/cars/:id", controller.update);
  app.delete("/cars/:id", controller.delete);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  carsRoutes
});
