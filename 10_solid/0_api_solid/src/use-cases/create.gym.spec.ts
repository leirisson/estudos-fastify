import { InmemoryGymRepository } from "@/repository/inMemory/in.memory.gyms.repository"
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCaseUseCase } from "./create.gym"


let gymRepository: InmemoryGymRepository
let sut: CreateGymUseCaseUseCase

describe('Create Gym Use Case', () => {
    beforeEach(() => {
        gymRepository = new InmemoryGymRepository()
        sut = new CreateGymUseCaseUseCase(gymRepository)
    })

    it('should be able to create gym', async () => {
        const { gym } = await sut.execute({
            title: "ADAMCAM",
            description: "academia de artes maciais",
            phone: "97996356684",
            latitude: -4.0849557,
            longitude: -63.1411739
        })

        expect(gym.id).toEqual(expect.any(String))
    })
})