import { hash } from "bcryptjs"
import { it, expect, describe, beforeEach } from "vitest"
import { GetUserPrifolileUseCase } from "./get.user.profile"
import { PrismaUsersRepository } from "@/repository/prisma/prisma.user.repository"
import { InmemoryUsersRepository } from "@/repository/inMemory/in.memory.user.repository"
import { ResouserNotExistsError } from "./errors/resoucer.not.found.erros"


let userRepository: InmemoryUsersRepository
let sut: GetUserPrifolileUseCase

describe('Get use Profile Use Case', () => {
    beforeEach(() => {
        userRepository = new InmemoryUsersRepository()
        sut = new GetUserPrifolileUseCase(userRepository)
    })

    it('should be get profile ', async () => {
        const userCreate = await userRepository.create({
            name: "Leirisson",
            email: "Leirisson.com@gmail.br",
            hashPassword: await hash("123456", 6)
        })

        const { user } = await sut.execute({
            userId: userCreate.id
        })

        expect(user.name).toEqual('Leirisson')
    })

    it('should not be able to get user profile with wrong id ', async () => {
        await expect(
            sut.execute({
                userId: 'non-existing-id'
            })
        ).rejects.toBeInstanceOf(ResouserNotExistsError)
    })


})