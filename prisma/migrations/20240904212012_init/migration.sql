-- CreateTable
CREATE TABLE "Food" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "price" TEXT,
    "ingredients" TEXT,
    "active" TEXT,
    "description" TEXT,
    "imageUrl" TEXT,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);
