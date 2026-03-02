import { CheckInRepository } from "@/repository/check.in.repository"
import { GymsRepository } from "@/repository/gyms.repository"
import { CheckIn } from "generated/prisma"
import { ResouserNotExistsError } from "./errors/resoucer.not.found.erros"
import { getDistanceBetweenCoordinates } from "@/utils/getDistanceBetweenCoordinates"
import { MaxNumberOfCheckInsError } from "./errors/max.number.of.check.ins.error"
import { MaxDistanceError } from "./errors/max.distance.error"


interface CheckinUseCaseRquest {
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}

interface CheckinUseCaseResponse {
    checkIn: CheckIn
}


export class CheckinUseCase {
    constructor(
        private checkInsRepository: CheckInRepository,
        private gymRepository: GymsRepository
    ) { }

    async execute({ userId, gymId, userLatitude, userLongitude }: CheckinUseCaseRquest) {

        const gym = await this.gymRepository.findById(gymId)
  
        if (!gym) {
            throw new ResouserNotExistsError()
        }

        // calcular a distancia entre o usuario e a academia

        const distance = getDistanceBetweenCoordinates(
            { latitude: userLatitude, longitude: userLongitude },
            { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
        )

        const MAX_DISTANCE_KILOMETRE = 0.1

        if(distance > MAX_DISTANCE_KILOMETRE){
            throw new MaxDistanceError()
        }  

        const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
            userId,
            new Date()
        )

        if (checkInOnSameDay) {
            throw new MaxNumberOfCheckInsError()
        }
        const checkIn = await this.checkInsRepository.create({ gymId, userId })

        return { checkIn }
    }
}