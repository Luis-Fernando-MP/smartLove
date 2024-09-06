/*
  Warnings:

  - You are about to drop the `RoomBusyDays` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fromDate` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toDate` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RoomBusyDays" DROP CONSTRAINT "RoomBusyDays_clientId_fkey";

-- DropForeignKey
ALTER TABLE "RoomBusyDays" DROP CONSTRAINT "RoomBusyDays_roomId_fkey";

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "fromDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "toDate" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "RoomBusyDays";
