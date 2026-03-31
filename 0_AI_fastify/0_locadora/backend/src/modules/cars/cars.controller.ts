import type { FastifyReply, FastifyRequest } from "fastify";
import {
  carIdParamSchema,
  createCarSchema,
  updateCarSchema,
} from "./cars.schema";
import {
  CarNotFoundError,
  CreateCarUseCase,
  DeleteCarUseCase,
  GetCarByIdUseCase,
  ListCarsUseCase,
  UpdateCarUseCase,
} from "./cars.use.case";
import type { CarsRepository } from "./cars.repository";

type ErrorResponse = { message: string };

function omitUndefined<T extends Record<string, unknown>>(data: T) {
  const entries = Object.entries(data).filter(([, value]) => value !== undefined);
  return Object.fromEntries(entries) as {
    [K in keyof T]?: Exclude<T[K], undefined>;
  };
}

function badRequest(reply: FastifyReply, message: string): FastifyReply {
  return reply.status(400).send({ message } satisfies ErrorResponse);
}

function notFound(reply: FastifyReply, message: string): FastifyReply {
  return reply.status(404).send({ message } satisfies ErrorResponse);
}

export class CarsController {
  constructor(private readonly carsRepository: CarsRepository) {}

  create = async (request: FastifyRequest, reply: FastifyReply) => {
    const parsed = createCarSchema.safeParse(request.body);
    if (!parsed.success) return badRequest(reply, "Invalid payload");

    const useCase = new CreateCarUseCase(this.carsRepository);
    const { brand, model, year, price, fuel, transmission, ...optional } =
      parsed.data;
    const car = await useCase.execute({brand, model, year, price, fuel, transmission, ...omitUndefined(optional)});

    return reply.status(201).send(car);
  };

  list = async (_request: FastifyRequest, reply: FastifyReply) => {
    const useCase = new ListCarsUseCase(this.carsRepository);
    const cars = await useCase.execute();
    return reply.status(200).send(cars);
  };

  getById = async (request: FastifyRequest, reply: FastifyReply) => {
    const params = carIdParamSchema.safeParse((request as any).params);
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

  update = async (request: FastifyRequest, reply: FastifyReply) => {
    const params = carIdParamSchema.safeParse((request as any).params);
    if (!params.success) return badRequest(reply, "Invalid id");

    const body = updateCarSchema.safeParse(request.body);
    if (!body.success) return badRequest(reply, "Invalid payload");

    const useCase = new UpdateCarUseCase(this.carsRepository);

    try {
      const car = await useCase.execute({
        id: params.data.id,
        ...(omitUndefined(body.data) as any),
      });
      return reply.status(200).send(car);
    } catch (err) {
      if (err instanceof CarNotFoundError) return notFound(reply, err.message);
      throw err;
    }
  };

  delete = async (request: FastifyRequest, reply: FastifyReply) => {
    const params = carIdParamSchema.safeParse((request as any).params);
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
}
