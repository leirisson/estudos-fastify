import { it, expect, describe, beforeEach } from 'vitest'
import { InmemoryGymRepository } from '@/repository/inMemory/in.memory.gyms.repository'
import { FetchNearbyUseCaseUseCase } from './fetch-nearby-gyms'

let gymsRepository: InmemoryGymRepository
let sut: FetchNearbyUseCaseUseCase

describe('Fetch Nearby Use Case', async () => {
    beforeEach(async () => {
        gymsRepository = new InmemoryGymRepository()
        sut = new FetchNearbyUseCaseUseCase(gymsRepository)

    })

    it('should be able to check-in history', async () => {

        await gymsRepository.create({
            title: "Near Gym",
            description: null,
            phone: "97996356684",
            latitude: -3.1331645,
            longitude: -60.0115105,
        })


        await gymsRepository.create({
            title: "Far Gym",
            description: null,
            phone: "97996356684",
            latitude: -4.0850252,
            longitude: -63.1382185,

        })



        const { gyms } = await sut.execute({
            userLatitude: -3.1307674,
            userLongitude: -60.0134442
        })


        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" }),])

    })
})
