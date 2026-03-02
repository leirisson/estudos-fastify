import { Gym, Prisma } from "generated/prisma"
import { GymsRepository } from "../gyms.repository"
import { randomUUID } from "node:crypto"


export class InmemoryGymRepository implements GymsRepository {

    public items: Gym[] = []

    async findById(id: string): Promise<Gym | null> {
        const gym = this.items.find((item) => item.id === id)

        if (!gym) {
            return null
        }

        return gym
    }

    async create(data: Prisma.GymCreateInput): Promise<Gym> {
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description as string,
            phone: data.phone as string,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            createdAt: new Date()
        }

        this.items.push(gym)
        return gym
    }
}