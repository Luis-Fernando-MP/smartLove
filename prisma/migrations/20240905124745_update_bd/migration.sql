/*
  Warnings:

  - You are about to drop the `RoomService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoomService" DROP CONSTRAINT "RoomService_roomId_fkey";

-- DropTable
DROP TABLE "RoomService";

-- CreateTable
CREATE TABLE "RoomServices" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "RoomServices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Services" (
    "id" SERIAL NOT NULL,
    "serviceName" VARCHAR(200) NOT NULL,
    "imageUrl" VARCHAR(255) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoomServices" ADD CONSTRAINT "RoomServices_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomServices" ADD CONSTRAINT "RoomServices_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
