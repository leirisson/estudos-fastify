import { GymsRepository } from "@/repository/gyms.repository";
import { Gym } from "generated/prisma";

interface CreateGymUseCaseRequest {
    title: string
    description: string | null
    phone: string | null
    latitude: number
    longitude: number
}

interface CreateGymUseCaseReponse {
    gym: Gym
}

export class CreateGymUseCaseUseCase {
    constructor(private gymsRepository: GymsRepository) { }

    async execute({
        title,
        description,
        phone,
        latitude,
        longitude }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseReponse> {

        const gym = await this.gymsRepository.create({
            title,
            description,
            phone,
            latitude,
            longitude
        })

        return { gym }
    }
}