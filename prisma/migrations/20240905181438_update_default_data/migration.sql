/*
  Warnings:

  - You are about to drop the column `email` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `photoUrl` on the `Client` table. All the data in the column will be lost.
  - Added the required column `photoUrl` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "email",
DROP COLUMN "photoUrl";

-- AlterTable
ALTER TABLE "Reservation" ALTER COLUMN "status" SET DEFAULT true;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "photoUrl" VARCHAR(255) NOT NULL,
ALTER COLUMN "status" SET DEFAULT true;
