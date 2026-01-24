import { it, expect, describe, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { RegisterUseCase } from './register'
import { InmemoryUsersRepository } from '@/repository/inMemory/in.memory.user.repository'
import { UserAlredyExistsError } from './errors/user.already.exists.error'



let userInmemoryRepository: InmemoryUsersRepository
let sut: RegisterUseCase

describe('Register use case', () => {

    beforeEach(() => {
        userInmemoryRepository = new InmemoryUsersRepository()
        sut = new RegisterUseCase(userInmemoryRepository)
    })


    it('should be able register', async () => {


        const { user } = await sut.execute({
            name: "Leirisson",
            email: "leirisson.123@gmail.com",
            password: "123456"
        })

        expect(user.id).toEqual(expect.any(String))

    })

    it('should hash user passsword upon registrations', async () => {

        const { user } = await sut.execute({
            name: 'jhon leiurisson',
            email: 'jhon.leirisson@gmail.com',
            password: '123456'
        })

        const isPasswordCorrectlyHash = await compare('123456', user.hashPassword)

        expect(isPasswordCorrectlyHash).toBe(true)
    })

    it('should not able to register with same email twice', async () => {

        const email = "leirisson.samtos@examplo.com"

        await sut.execute({
            name: "Leirisson",
            email,
            password: "123456"
        })

        // Segundo registro: deve falhar
        await expect(sut.execute({
            name: "Leirisson",
            email,
            password: "123456"
        })
        ).rejects.toBeInstanceOf(UserAlredyExistsError)
    })
})
