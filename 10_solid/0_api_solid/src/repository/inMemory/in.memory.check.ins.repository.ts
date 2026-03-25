import { CheckIn, Prisma } from "generated/prisma"
import { CheckInRepository } from "../check.in.repository";
import { randomUUID } from "node:crypto";
import dayjs = require("dayjs");


export class InMemoryCheckInRepository implements CheckInRepository {

    checkIns: CheckIn[] = []

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

    async findById(id: string) {
        const checkIn = this.checkIns.find((item) => item.id === id)

        if (!checkIn) {
            return null
        }

        return checkIn
    }

    async findManyByUserId(userId: string, page: number) {
        return this.checkIns
            .filter(items => items.userId === userId)
            .slice((page - 1) * 20, page * 20)
    }

    async findByUserIdOnDate(userId: string, date: Date) {

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

    async countByUserId(userId: string) {
        return this.checkIns
            .filter(items => items.userId === userId).length
    }


    async save(checkIn: CheckIn) {
        const checkInIndex = this.checkIns.findIndex(item => item.id === checkIn.id)

        if (checkInIndex >= 0) {
            this.checkIns[checkInIndex] = checkIn
        }

        return checkIn
    }

}