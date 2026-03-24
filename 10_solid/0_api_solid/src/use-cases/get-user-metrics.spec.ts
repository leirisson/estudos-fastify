import { InMemoryCheckInRepository } from '@/repository/inMemory/in.memory.check.ins.repository'
import { it, expect, describe, beforeEach } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', async () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInRepository()
        sut = new GetUserMetricsUseCase(checkInsRepository)
    })

    it('should be able to check-in history', async () => {

        await checkInsRepository.create({
            gymId: "gym-01",
            userId: "user-01"
        })


        await checkInsRepository.create({
            gymId: "gym-02",
            userId: "user-01"
        })


        const { checkInsCount } = await sut.execute({
            userId: "user-01",
        })



        expect(checkInsCount).toEqual(2)
    })




})
