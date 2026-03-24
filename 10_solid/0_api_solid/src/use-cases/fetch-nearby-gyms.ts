import { GymsRepository } from "@/repository/gyms.repository";
import { Gym } from "generated/prisma";

interface FetchNearbyUseCaseRequest {
    userLatitude: number
    userLongitude: number
}

interface FetchNearbyUseCaseReponse {
    gyms: Gym[]
}

export class FetchNearbyUseCaseUseCase {
    constructor(private gymsRepository: GymsRepository) { }

    async execute({ userLatitude, userLongitude }: FetchNearbyUseCaseRequest): Promise<FetchNearbyUseCaseReponse> {

        const gyms = await this.gymsRepository.findManyNearBy({
            latitude: userLatitude,
            longitude: userLongitude
        })

        return { gyms }
    }
}