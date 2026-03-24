import { GymsRepository } from "@/repository/gyms.repository";
import { Gym } from "generated/prisma";

interface SearchGymUseCaseRequest {
    query: string
    page: number
}

interface SearchGymUseCaseReponse {
    gyms: Gym[]
}

export class SearchGymUseCaseUseCase {
    constructor(private gymsRepository: GymsRepository) { }

    async execute({ query, page }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseReponse> {

        const gyms = await this.gymsRepository.searchMany(query, page)

        return { gyms }
    }
}