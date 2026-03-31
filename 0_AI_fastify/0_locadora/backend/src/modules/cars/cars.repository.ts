export type Car = {
  id: string;
  brand: string;
  model: string;
  version?: string;
  year: number;
  price: number;
  fuel: string;
  transmission: string;
  mileage?: number;
  imageUrl?: string;
};

export type CreateCarRepositoryInput = Omit<Car, "id">;
export type UpdateCarRepositoryInput = Partial<Omit<Car, "id">> & { id: string };

export interface CarsRepository {
  create(data: CreateCarRepositoryInput): Promise<Car>;
  findMany(): Promise<Car[]>;
  findById(id: string): Promise<Car | null>;
  update(data: UpdateCarRepositoryInput): Promise<Car | null>;
  delete(id: string): Promise<boolean>;
}

type PrismaCar = {
  id: string;
  brand: string;
  model: string;
  version: string;
  year: string;
  price: number;
  flue: string;
  transmission: string;
  mileage: number;
  imgUrl: string;
};

function toDomain(car: PrismaCar): Car {
  const year = Number.parseInt(car.year, 10);

  const base: Car = {
    id: car.id,
    brand: car.brand,
    model: car.model,
    year: Number.isFinite(year) ? year : 0,
    price: car.price,
    fuel: car.flue,
    transmission: car.transmission,
  };

  return {
    ...base,
    ...(car.version.length > 0 ? { version: car.version } : {}),
    ...(car.mileage > 0 ? { mileage: car.mileage } : {}),
    ...(car.imgUrl.length > 0 ? { imageUrl: car.imgUrl } : {}),
  };
}

export class PrismaCarsRepository implements CarsRepository {
  private async prisma() {
    const prismaModulePath = "../../infra/prisma/index.js";
    const { default: prisma } = await import(prismaModulePath);
    return prisma;
  }

  async create(data: CreateCarRepositoryInput): Promise<Car> {
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
        imgUrl: data.imageUrl ?? "",
      },
    });

    return toDomain(created);
  }

  async findMany(): Promise<Car[]> {
    const prisma = await this.prisma();
    const cars = await prisma.car.findMany({ orderBy: { createAt: "desc" } });
    return cars.map(toDomain);
  }

  async findById(id: string): Promise<Car | null> {
    const prisma = await this.prisma();
    const car = await prisma.car.findUnique({ where: { id } });
    return car ? toDomain(car) : null;
  }

  async update(data: UpdateCarRepositoryInput): Promise<Car | null> {
    const prisma = await this.prisma();

    const current = await prisma.car.findUnique({ where: { id: data.id } });
    if (!current) return null;

    const updated = await prisma.car.update({
      where: { id: data.id },
      data: {
        brand: data.brand,
        model: data.model,
        version: data.version,
        year: data.year !== undefined ? String(data.year) : undefined,
        price: data.price,
        flue: data.fuel,
        transmission: data.transmission,
        mileage: data.mileage,
        imgUrl: data.imageUrl,
      },
    });

    return toDomain(updated);
  }

  async delete(id: string): Promise<boolean> {
    const prisma = await this.prisma();

    const current = await prisma.car.findUnique({ where: { id } });
    if (!current) return false;

    await prisma.car.delete({ where: { id } });
    return true;
  }
}
