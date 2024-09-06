/*
  Warnings:

  - The `classification` column on the `Room` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `capacity` column on the `Room` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pricing` column on the `Room` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "classification",
ADD COLUMN     "classification" TEXT[] DEFAULT ARRAY['ALL']::TEXT[],
DROP COLUMN "capacity",
ADD COLUMN     "capacity" TEXT[] DEFAULT ARRAY['ALL']::TEXT[],
DROP COLUMN "pricing",
ADD COLUMN     "pricing" TEXT[] DEFAULT ARRAY['ALL']::TEXT[];
