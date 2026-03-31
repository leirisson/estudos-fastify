import { beforeEach, describe, expect, it } from "vitest";
import { randomUUID } from "node:crypto";
import {
  CarNotFoundError,
  CreateCarUseCase,
  DeleteCarUseCase,
  GetCarByIdUseCase,
  ListCarsUseCase,
  UpdateCarUseCase,
} from "./cars.use.case";
import type {
  Car,
  CarsRepository,
  CreateCarRepositoryInput,
  UpdateCarRepositoryInput,
} from "./cars.repository";

class InMemoryCarsRepository implements CarsRepository {
  private items: Car[] = [];

  async create(data: CreateCarRepositoryInput): Promise<Car> {
    const car: Car = {
      id: randomUUID(),
      brand: data.brand,
      model: data.model,
      year: data.year,
      price: data.price,
      fuel: data.fuel,
      transmission: data.transmission,
      ...(data.version !== undefined ? { version: data.version } : {}),
      ...(data.mileage !== undefined ? { mileage: data.mileage } : {}),
      ...(data.imageUrl !== undefined ? { imageUrl: data.imageUrl } : {}),
    };

    this.items.push(car);
    return car;
  }

  async findMany(): Promise<Car[]> {
    return [...this.items];
  }

  async findById(id: string): Promise<Car | null> {
    return this.items.find((item) => item.id === id) ?? null;
  }

  async update(data: UpdateCarRepositoryInput): Promise<Car | null> {
    const index = this.items.findIndex((item) => item.id === data.id);
    if (index === -1) return null;

    const current = this.items[index]!;
    const next: Car = {
      ...current,
      ...data,
    };

    this.items[index] = next;
    return next;
  }

  async delete(id: string): Promise<boolean> {
    const before = this.items.length;
    this.items = this.items.filter((item) => item.id !== id);
    return this.items.length !== before;
  }
}

describe("Cars use cases", () => {
  let carsRepository: CarsRepository;

  beforeEach(() => {
    carsRepository = new InMemoryCarsRepository();
  });

  it("creates a car", async () => {
    const sut = new CreateCarUseCase(carsRepository);

    const car = await sut.execute({
      brand: "Fiat",
      model: "Argo",
      year: 2020,
      price: 69990,
      fuel: "flex",
      transmission: "manual",
    });

    expect(car.id).toBeTypeOf("string");
    expect(car.brand).toBe("Fiat");
    expect(car.version).toBeUndefined();
  });

  it("lists cars", async () => {
    const create = new CreateCarUseCase(carsRepository);
    await create.execute({
      brand: "Fiat",
      model: "Argo",
      year: 2020,
      price: 69990,
      fuel: "flex",
      transmission: "manual",
    });

    const sut = new ListCarsUseCase(carsRepository);
    const cars = await sut.execute();

    expect(cars).toHaveLength(1);
    expect(cars[0]!.model).toBe("Argo");
  });

  it("gets a car by id", async () => {
    const created = await new CreateCarUseCase(carsRepository).execute({
      brand: "Fiat",
      model: "Argo",
      year: 2020,
      price: 69990,
      fuel: "flex",
      transmission: "manual",
    });

    const sut = new GetCarByIdUseCase(carsRepository);
    const car = await sut.execute({ id: created.id });

    expect(car.id).toBe(created.id);
  });

  it("throws when getting an unknown car", async () => {
    const sut = new GetCarByIdUseCase(carsRepository);

    await expect(sut.execute({ id: randomUUID() })).rejects.toBeInstanceOf(
      CarNotFoundError,
    );
  });

  it("updates a car", async () => {
    const created = await new CreateCarUseCase(carsRepository).execute({
      brand: "Fiat",
      model: "Argo",
      year: 2020,
      price: 69990,
      fuel: "flex",
      transmission: "manual",
    });

    const sut = new UpdateCarUseCase(carsRepository);
    const updated = await sut.execute({
      id: created.id,
      price: 74990,
      mileage: 12345,
    });

    expect(updated.price).toBe(74990);
    expect(updated.mileage).toBe(12345);
  });

  it("throws when updating an unknown car", async () => {
    const sut = new UpdateCarUseCase(carsRepository);

    await expect(
      sut.execute({ id: randomUUID(), price: 10 }),
    ).rejects.toBeInstanceOf(CarNotFoundError);
  });

  it("deletes a car", async () => {
    const created = await new CreateCarUseCase(carsRepository).execute({
      brand: "Fiat",
      model: "Argo",
      year: 2020,
      price: 69990,
      fuel: "flex",
      transmission: "manual",
    });

    const sut = new DeleteCarUseCase(carsRepository);
    await sut.execute({ id: created.id });

    const list = new ListCarsUseCase(carsRepository);
    const cars = await list.execute();

    expect(cars).toHaveLength(0);
  });

  it("throws when deleting an unknown car", async () => {
    const sut = new DeleteCarUseCase(carsRepository);

    await expect(sut.execute({ id: randomUUID() })).rejects.toBeInstanceOf(
      CarNotFoundError,
    );
  });
});
