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

// src/modules/cars/cars.controller.ts
var cars_controller_exports = {};
__export(cars_controller_exports, {
  CarsController: () => CarsController
});
module.exports = __toCommonJS(cars_controller_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CarsController
});
