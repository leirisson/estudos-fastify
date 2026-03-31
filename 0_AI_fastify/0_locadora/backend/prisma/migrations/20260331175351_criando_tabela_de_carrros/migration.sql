-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "flue" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "mileage" INTEGER NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);
