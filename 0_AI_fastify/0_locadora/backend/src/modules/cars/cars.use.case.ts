import type {
  Car,
  CarsRepository,
  CreateCarRepositoryInput,
  UpdateCarRepositoryInput,
} from "./cars.repository";

export class CarNotFoundError extends Error {
  constructor() {
    super("Car not found");
  }
}

export class CreateCarUseCase {
  constructor(private readonly carsRepository: CarsRepository) {}

  async execute(input: CreateCarRepositoryInput): Promise<Car> {
    return this.carsRepository.create(input);
  }
}

export class ListCarsUseCase {
  constructor(private readonly carsRepository: CarsRepository) {}

  async execute(): Promise<Car[]> {
    return this.carsRepository.findMany();
  }
}

export class GetCarByIdUseCase {
  constructor(private readonly carsRepository: CarsRepository) {}

  async execute(input: { id: string }): Promise<Car> {
    const car = await this.carsRepository.findById(input.id);
    if (!car) throw new CarNotFoundError();
    return car;
  }
}

export class UpdateCarUseCase {
  constructor(private readonly carsRepository: CarsRepository) {}

  async execute(input: UpdateCarRepositoryInput): Promise<Car> {
    const car = await this.carsRepository.update(input);
    if (!car) throw new CarNotFoundError();
    return car;
  }
}

export class DeleteCarUseCase {
  constructor(private readonly carsRepository: CarsRepository) {}

  async execute(input: { id: string }): Promise<void> {
    const deleted = await this.carsRepository.delete(input.id);
    if (!deleted) throw new CarNotFoundError();
  }
}
