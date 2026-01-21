/*
  Warnings:

  - Added the required column `gymId` to the `check_in` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `check_in` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "check_in" ADD COLUMN     "gymId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "check_in" ADD CONSTRAINT "check_in_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_in" ADD CONSTRAINT "check_in_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
