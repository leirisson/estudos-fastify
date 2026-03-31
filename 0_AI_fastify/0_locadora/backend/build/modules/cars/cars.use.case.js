"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/modules/cars/cars.use.case.ts
var cars_use_case_exports = {};
__export(cars_use_case_exports, {
  CarNotFoundError: () => CarNotFoundError,
  CreateCarUseCase: () => CreateCarUseCase,
  DeleteCarUseCase: () => DeleteCarUseCase,
  GetCarByIdUseCase: () => GetCarByIdUseCase,
  ListCarsUseCase: () => ListCarsUseCase,
  UpdateCarUseCase: () => UpdateCarUseCase
});
module.exports = __toCommonJS(cars_use_case_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CarNotFoundError,
  CreateCarUseCase,
  DeleteCarUseCase,
  GetCarByIdUseCase,
  ListCarsUseCase,
  UpdateCarUseCase
});
