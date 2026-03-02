import { InMemoryCheckInRepository } from '@/repository/inMemory/in.memory.check.ins.repository'
import { it, expect, describe, beforeEach, afterEach, vi } from 'vitest'
import { CheckinUseCase } from './check.in'
import { InmemoryGymRepository } from '@/repository/inMemory/in.memory.gyms.repository'
import { Decimal } from 'generated/prisma/runtime/client'
import { MaxNumberOfCheckInsError } from './errors/max.number.of.check.ins.error'
import { MaxDistanceError } from './errors/max.distance.error'

let checkInsRepository: InMemoryCheckInRepository
let gymRepository: InmemoryGymRepository
let sut: CheckinUseCase

describe('check=in Us Case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInRepository()
        gymRepository = new InmemoryGymRepository()
        sut = new CheckinUseCase(checkInsRepository, gymRepository)

        await gymRepository.create({
            id: 'gym-01',
            description: '',
            title: 'Javascript gym',
            phone: '',
            latitude: -3.1307674,
            longitude: -60.0134442
        })

        console.log()

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })


    it('should be able to check in ', async () => {
        const { checkIn } = await sut.execute({
            gymId: "gym-01",
            userId: "user-01",
            userLatitude: -3.1307674,
            userLongitude: -60.0134442,
        })

        console.log(checkIn)

        expect(checkIn.id).toEqual(expect.any(String))
    })


    it('should not be able to check in twice in same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: "gym-01",
            userId: "user-01",
            userLatitude: -3.1307674,
            userLongitude: -60.0134442,
        })

        await expect(sut.execute({
            gymId: "gym-01",
            userId: "user-01",
            userLatitude: -3.1307674,
            userLongitude: -60.0134442,
        })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
    })

    it('should not be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: "gym-01",
            userId: "user-01",
            userLatitude:  -3.1307674,
            userLongitude: -60.0134442,
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: "gym-01",
            userId: "user-01",
            userLatitude:  -3.1307674,
            userLongitude: -60.0134442,
        })
        expect(checkIn).toHaveProperty('id', expect.any(String))
    })

    it('should not be able to check in on distant gym', async () => {

        await gymRepository.items.push({
            id: 'gym-02',
            description: '',
            title: 'Javascript gym',
            phone: '',
            latitude: new Decimal(-3.1307674),
            longitude: new Decimal(-60.0134442)
        })

        await expect(sut.execute({
            gymId: "gym-01",
            userId: "user-01",
            userLatitude: new Decimal(-3.1336124).toNumber(),
            userLongitude: new Decimal(-3.1336124).toNumber()
        })).rejects.toBeInstanceOf(MaxDistanceError)
    })


})