import { InMemoryCheckInRepository } from '@/repository/inMemory/in.memory.check.ins.repository'
import { it, expect, describe, beforeEach, afterEach, vi } from 'vitest'
import { ValidateCheckinUseCase } from './validate-check-in'
import { ResouserNotExistsError } from './errors/resoucer.not.found.erros'

let checkInsRepository: InMemoryCheckInRepository
let inMemoryCheckInRepository: InMemoryCheckInRepository
let sut: ValidateCheckinUseCase

describe('checkin UseCase', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInRepository()
        inMemoryCheckInRepository = new InMemoryCheckInRepository()
        sut = new ValidateCheckinUseCase(checkInsRepository)

        // await gymRepository.create({
        //     id: 'gym-01',
        //     description: '',
        //     title: 'Javascript gym',
        //     phone: '',
        //     latitude: -3.1307674,
        //     longitude: -60.0134442
        // })


        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })


    it('should be able to validate check-in ', async () => {
        const createdetCheckIn = await checkInsRepository.create(
            {
                gymId: "gym-01",
                userId: "user-01"
            }
        )


        const { checkIn } = await sut.execute({ checkinId: createdetCheckIn.id })

        expect(checkIn.validatedAt).toEqual(expect.any(Date))
        expect(checkInsRepository.checkIns[0]?.validatedAt).toEqual(expect.any(Date))
    })

    it('should be able to validate an inexistent check-in ', async () => {
        expect(async () => {
            await sut.execute({
                checkinId: "sem-id"
            })
        }).rejects.toBeInstanceOf(ResouserNotExistsError)
    })


    it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
        vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

        const createdetCheckIn = await checkInsRepository.create(
            {
                gymId: "gym-01",
                userId: "user-01"
            }
        )

        const twentyoneMinutesInMs = 1000 * 60 * 21
        vi.advanceTimersByTime(twentyoneMinutesInMs)


        expect(async () => {
            await sut.execute({
                 checkinId: createdetCheckIn.id
            })
        }).rejects.toBeInstanceOf(Error)

    })

})