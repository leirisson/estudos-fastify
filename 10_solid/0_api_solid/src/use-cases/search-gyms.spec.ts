import { it, expect, describe, beforeEach } from 'vitest'
import { InmemoryGymRepository } from '@/repository/inMemory/in.memory.gyms.repository'
import { SearchGymUseCaseUseCase } from './search-gyms'

let gymsRepository: InmemoryGymRepository
let sut: SearchGymUseCaseUseCase

describe('Fetch User check-in History Use Case', async () => {
    beforeEach(async () => {
        gymsRepository = new InmemoryGymRepository()
        sut = new SearchGymUseCaseUseCase(gymsRepository)

    })

    it('should be able to check-in history', async () => {

        await gymsRepository.create({
            title: "JavaScript",
            description: null,
            phone: "97996356684",
            latitude: -4.0849557,
            longitude: -63.1411739
        })


        await gymsRepository.create({
            title: "TypeScript",
            description: null,
            phone: "97996356684",
            latitude: -4.0849557,
            longitude: -63.1411739

        })



        const { gyms } = await sut.execute({
            query: "JavaScript",
            page: 1
        })



        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([expect.objectContaining({ title: "JavaScript" }),])

    })

    it('should be able to fetch pagineted gyms search', async () => {
        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                title: `JavaScript Gym ${i}`,
                description: null,
                phone: "97996356684",
                latitude: -4.0849557,
                longitude: -63.1411739
            })
        }

        const {gyms} = await sut.execute({
            query: "JavaScript",
            page: 2
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({title: "JavaScript Gym 21"}),
            expect.objectContaining({title: "JavaScript Gym 22"})
        ])
    })

})
