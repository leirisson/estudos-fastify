import Fastify from "fastify";
import { randomUUID } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { carsRoutes } from "./cars.routes";
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

describe("Cars routes", () => {
  let app: ReturnType<typeof Fastify>;
  let carsRepository: CarsRepository;

  beforeEach(async () => {
    carsRepository = new InMemoryCarsRepository();
    app = Fastify();
    await app.register(carsRoutes, { carsRepository });
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("POST /cars -> 201", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/cars",
      payload: {
        brand: "Fiat",
        model: "Argo",
        year: 2020,
        price: 69990,
        fuel: "flex",
        transmission: "manual",
      },
    });

    expect(response.statusCode).toBe(201);
    const body = response.json();
    expect(body.id).toBeTypeOf("string");
    expect(body.brand).toBe("Fiat");
  });

  it("GET /cars -> 200", async () => {
    await app.inject({
      method: "POST",
      url: "/cars",
      payload: {
        brand: "Fiat",
        model: "Argo",
        year: 2020,
        price: 69990,
        fuel: "flex",
        transmission: "manual",
      },
    });

    const response = await app.inject({
      method: "GET",
      url: "/cars",
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body).toHaveLength(1);
  });

  it("GET /cars/:id -> 200", async () => {
    const created = await app.inject({
      method: "POST",
      url: "/cars",
      payload: {
        brand: "Fiat",
        model: "Argo",
        year: 2020,
        price: 69990,
        fuel: "flex",
        transmission: "manual",
      },
    });

    const { id } = created.json();

    const response = await app.inject({
      method: "GET",
      url: `/cars/${id}`,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().id).toBe(id);
  });

  it("PATCH /cars/:id -> 200", async () => {
    const created = await app.inject({
      method: "POST",
      url: "/cars",
      payload: {
        brand: "Fiat",
        model: "Argo",
        year: 2020,
        price: 69990,
        fuel: "flex",
        transmission: "manual",
      },
    });

    const { id } = created.json();

    const response = await app.inject({
      method: "PATCH",
      url: `/cars/${id}`,
      payload: { price: 74990, mileage: 12345 },
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.price).toBe(74990);
    expect(body.mileage).toBe(12345);
  });

  it("DELETE /cars/:id -> 204", async () => {
    const created = await app.inject({
      method: "POST",
      url: "/cars",
      payload: {
        brand: "Fiat",
        model: "Argo",
        year: 2020,
        price: 69990,
        fuel: "flex",
        transmission: "manual",
      },
    });

    const { id } = created.json();

    const response = await app.inject({
      method: "DELETE",
      url: `/cars/${id}`,
    });

    expect(response.statusCode).toBe(204);
  });

  it("GET /cars/:id -> 404 when not found", async () => {
    const response = await app.inject({
      method: "GET",
      url: `/cars/${randomUUID()}`,
    });

    expect(response.statusCode).toBe(404);
    expect(response.json().message).toBeTypeOf("string");
  });

  it("POST /cars -> 400 when invalid payload", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/cars",
      payload: {
        brand: "",
        model: "Argo",
        year: 2020,
        price: 69990,
        fuel: "flex",
        transmission: "manual",
      },
    });

    expect(response.statusCode).toBe(400);
    expect(response.json().message).toBeTypeOf("string");
  });
});
