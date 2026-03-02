import { CheckIn, Prisma } from "generated/prisma"
import { CheckInRepository } from "../check.in.repository";
import { randomUUID } from "node:crypto";
import dayjs = require("dayjs");


export class InMemoryCheckInRepository implements CheckInRepository {


    private checkIns: CheckIn[] = []

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkin = {
            id: data.id ?? randomUUID(),
            userId: data.userId,
            gymId: data.gymId,
            validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
            createdAt: new Date()

        }

        this.checkIns.push(checkin)

        return checkin
    }

    async findManyByUserId(userId: string) {
        return this.checkIns.filter(items => items.userId === userId)
    }

    async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {

        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')


        const checkInOnSameDate = this.checkIns.find((checkIn) => {
            const checkInDate = dayjs(checkIn.createdAt)
            const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

            return checkIn.userId === userId && isOnSameDate
        })

        if (!checkInOnSameDate) {
            return null
        }

        return checkInOnSameDate
    }

}