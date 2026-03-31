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

// src/modules/cars/cars.repository.ts
var cars_repository_exports = {};
__export(cars_repository_exports, {
  PrismaCarsRepository: () => PrismaCarsRepository
});
module.exports = __toCommonJS(cars_repository_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PrismaCarsRepository
});
