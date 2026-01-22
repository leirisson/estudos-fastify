import { it, expect, describe } from 'vitest'
import { compare } from 'bcryptjs'
import { RegisterUseCase } from './register'
import { InmemoryUsersRepository } from '@/repository/inMemory/in.memory.user.repository'
import { UserAlredyExistsError } from './errors/user.already.exists.error'


describe('Register use case', () => {
    it('should be able register', async () => {
        const userInmemoryRepository = new InmemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(userInmemoryRepository)

        const { user } = await registerUseCase.execute({
            name: "Leirisson",
            email: "leirisson.123@gmail.com",
            password: "123456"
        })

        expect(user.id).toEqual(expect.any(String))

    })

    it('should hash user passsword upon registrations', async () => {
        const userRepository = new InmemoryUsersRepository()
        const registerUSeCAse = new RegisterUseCase(userRepository)

        const { user } = await registerUSeCAse.execute({
            name: 'jhon leiurisson',
            email: 'jhon.leirisson@gmail.com',
            password: '123456'
        })

        const isPasswordCorrectlyHash = await compare('123456', user.hashPassword)

        expect(isPasswordCorrectlyHash).toBe(true)
    })

    it('should not able to register with same email twice', async () => {
        const userRepository = new InmemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(userRepository)

        const email = "leirisson.samtos@examplo.com"

        await registerUseCase.execute({
            name: "Leirisson",
            email,
            password: "123456"
        })

        // Segundo registro: deve falhar
        await expect(registerUseCase.execute({
            name: "Leirisson",
            email,
            password: "123456"
        })
        ).rejects.toBeInstanceOf(UserAlredyExistsError)
    })
})
