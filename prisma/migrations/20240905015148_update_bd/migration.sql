/*
  Warnings:

  - You are about to drop the column `status` on the `Client` table. All the data in the column will be lost.
  - You are about to alter the column `documentNumber` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `VarChar(10)`.
  - You are about to alter the column `phone` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `VarChar(12)`.
  - You are about to alter the column `name` on the `Room` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(100)`.
  - You are about to alter the column `description` on the `Room` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to drop the `BusyDay` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BusyDay" DROP CONSTRAINT "BusyDay_roomId_fkey";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "status",
ALTER COLUMN "documentNumber" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(12);

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "status" SET DEFAULT true,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(200);

-- DropTable
DROP TABLE "BusyDay";
