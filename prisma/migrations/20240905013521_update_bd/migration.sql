/*
  Warnings:

  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Habitacion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ImagenesHabitacion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reserva` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiciosHabitacion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RoomClassification" AS ENUM ('ALL', 'EXCELLENT', 'VERY_GOOD', 'GOOD');

-- CreateEnum
CREATE TYPE "RoomCapacity" AS ENUM ('LESS_THAN_TWO', 'TWO_TO_THREE', 'FOUR_TO_SIX', 'MORE_THAN_SIX');

-- CreateEnum
CREATE TYPE "RoomPricing" AS ENUM ('LESS_THAN_40', 'BETWEEN_40_AND_89', 'BETWEEN_90_AND_140', 'MORE_THAN_140');

-- DropForeignKey
ALTER TABLE "ImagenesHabitacion" DROP CONSTRAINT "ImagenesHabitacion_idhabitacion_fkey";

-- DropForeignKey
ALTER TABLE "Reserva" DROP CONSTRAINT "Reserva_idcliente_fkey";

-- DropForeignKey
ALTER TABLE "Reserva" DROP CONSTRAINT "Reserva_idhabitacion_fkey";

-- DropForeignKey
ALTER TABLE "ServiciosHabitacion" DROP CONSTRAINT "ServiciosHabitacion_idhabitacion_fkey";

-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_idcliente_fkey";

-- DropTable
DROP TABLE "Cliente";

-- DropTable
DROP TABLE "Habitacion";

-- DropTable
DROP TABLE "ImagenesHabitacion";

-- DropTable
DROP TABLE "Reserva";

-- DropTable
DROP TABLE "ServiciosHabitacion";

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reservationCount" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "classification" "RoomClassification" NOT NULL,
    "capacity" "RoomCapacity" NOT NULL,
    "pricing" "RoomPricing" NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusyDay" (
    "id" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "clientId" INTEGER NOT NULL,
    "clientName" TEXT NOT NULL,

    CONSTRAINT "BusyDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomService" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "serviceName" VARCHAR(200) NOT NULL,
    "imageUrl" VARCHAR(255) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "RoomService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomImage" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "imageUrl" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "clientId" SERIAL NOT NULL,
    "clerkId" TEXT NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "documentNumber" VARCHAR(20) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "photoUrl" VARCHAR(255) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("clientId")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,
    "totalDays" INTEGER NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "tax" DECIMAL(10,2) NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(10) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_clerkId_key" ON "Client"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_clientId_key" ON "User"("clientId");

-- AddForeignKey
ALTER TABLE "BusyDay" ADD CONSTRAINT "BusyDay_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomService" ADD CONSTRAINT "RoomService_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomImage" ADD CONSTRAINT "RoomImage_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("clientId") ON DELETE RESTRICT ON UPDATE CASCADE;
