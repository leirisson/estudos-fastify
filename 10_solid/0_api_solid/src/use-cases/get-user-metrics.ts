import { CheckInRepository } from "@/repository/check.in.repository"
import { CheckIn } from "generated/prisma"


interface GetUserMetricsUseCaseRequest {
    userId: string
}

interface GetUserMetricsUseCaseResponse {
    checkInsCount: number
}


export class GetUserMetricsUseCase {
    constructor(private checkinRepository: CheckInRepository) { }

    async execute({
        userId
    }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {

        const checkInsCount = await this.checkinRepository.countByUserId(userId)
        return { checkInsCount, }
    }
}