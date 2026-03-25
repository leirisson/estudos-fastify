import { CheckInRepository } from "@/repository/check.in.repository"
import { CheckIn } from "generated/prisma"
import { ResouserNotExistsError } from "./errors/resoucer.not.found.erros"
import dayjs = require("dayjs")
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error"


interface ValidateCheckinUseCaseRquest {
    checkinId: string
}

interface ValidateCheckinUseCaseResponse {
    checkIn: CheckIn
}


export class ValidateCheckinUseCase {
    constructor(
        private checkInsRepository: CheckInRepository,
    ) { }

    async execute({ checkinId }: ValidateCheckinUseCaseRquest) {

        const checkIn = await this.checkInsRepository.findById(checkinId)

        if (!checkIn) {
            throw new ResouserNotExistsError()
        }

        const distanceInMinutesFromCheckInCreation = dayjs(new Date).diff(
            checkIn.createdAt,
            'minutes'
        )

        if(distanceInMinutesFromCheckInCreation > 20){
            throw new LateCheckInValidationError()
        }


        checkIn.validatedAt = new Date()

        await this.checkInsRepository.save(checkIn)

        return { checkIn }
    }
}