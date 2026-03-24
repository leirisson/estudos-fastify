import { CheckInRepository } from '@/repository/check.in.repository'
import { CheckIn } from '../../generated/prisma/client'


interface FetchUserCheckInsHistoryUseCaseRequest {
    userId: string,
    page: number
}

interface FetchUserCheckInsHistoryUseCaseResponse {
    checkIns: CheckIn[]
}


export class FetchUserCheckInsHistoryUseCase {
    constructor(private CheckInsRepository: CheckInRepository) { }

    async execute({ userId, page}: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
        const checkIns = await this.CheckInsRepository.findManyByUserId(userId, page)
        return { checkIns }
    }
}