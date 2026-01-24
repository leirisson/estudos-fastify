import { it, expect, describe } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { AthenticateUseCase } from './authenticate'
import { RegisterUseCase } from './register'
import { InmemoryUsersRepository } from '@/repository/inMemory/in.memory.user.repository'
import { InvalideCredentialError } from './errors/invalide.credentials.error'


describe('Autheticate UseCase', () => {
    it('should be able to authenticate', async () => {
        const userInMemoryRepository = new InmemoryUsersRepository()
        const sut = new AthenticateUseCase(userInMemoryRepository)

        await userInMemoryRepository.create({
            name: "Leirisson",
            email: "leirisson.santos@gmail.com",
            hashPassword: await hash('123456', 6)
        })


        const { user } = await sut.execute({
            email: "leirisson.santos@gmail.com",
            password: "123456"
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with qrong email', async () => {
        const userInMemoryRepository = new InmemoryUsersRepository()
        const sut = new AthenticateUseCase(userInMemoryRepository)

        await expect(sut.execute({
            email: "leirisson.santos@gmail.com",
            password: "123456"
        })
        ).rejects.toBeInstanceOf(InvalideCredentialError)


    })


    it('should be able to authenticate with wrong password', async () => {
        const userInMemoryRepository = new InmemoryUsersRepository()
        const sut = new AthenticateUseCase(userInMemoryRepository)

        await userInMemoryRepository.create({
            name: "Leirisson",
            email: "leirisson.santos@gmail.com",
            hashPassword: await hash('123456', 6)
        })

        await expect(sut.execute({
            email: "leirisson.santos@gmail.com",
            password: "123456789"
        })
        ).rejects.toBeInstanceOf(InvalideCredentialError)

    })



})