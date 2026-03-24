import { Gym, Prisma } from "generated/prisma";

export interface FindnearbyParams {
    latitude: number
    longitude: number
}


export interface GymsRepository {
    findById(id: string): Promise<Gym | null>
    findManyNearBy(params: FindnearbyParams): Promise<Gym[]>
    searchMany(query: string, page:number): Promise<Gym[]>
    create(data: Prisma.GymCreateInput): Promise<Gym>
}