/*
  Warnings:

  - You are about to drop the `Food` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Food";

-- CreateTable
CREATE TABLE "Habitacion" (
    "idhabitacion" SERIAL NOT NULL,
    "nombre" VARCHAR(200) NOT NULL,
    "precio" DECIMAL(10,2) NOT NULL,
    "estado" BOOLEAN NOT NULL,
    "fechcreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechedicion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Habitacion_pkey" PRIMARY KEY ("idhabitacion")
);

-- CreateTable
CREATE TABLE "ServiciosHabitacion" (
    "idservhabitacion" SERIAL NOT NULL,
    "idhabitacion" INTEGER NOT NULL,
    "nombreservicio" VARCHAR(200) NOT NULL,
    "urlimagen" VARCHAR(255) NOT NULL,
    "estado" BOOLEAN NOT NULL,
    "fechcreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechedicion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiciosHabitacion_pkey" PRIMARY KEY ("idservhabitacion")
);

-- CreateTable
CREATE TABLE "ImagenesHabitacion" (
    "idimghabitacion" SERIAL NOT NULL,
    "idhabitacion" INTEGER NOT NULL,
    "urlimagen" VARCHAR(255) NOT NULL,
    "fechcreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usredicion" VARCHAR(100) NOT NULL,
    "fechedicion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImagenesHabitacion_pkey" PRIMARY KEY ("idimghabitacion")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "idcliente" SERIAL NOT NULL,
    "nombres" VARCHAR(100) NOT NULL,
    "apellidos" VARCHAR(100) NOT NULL,
    "nrodocumento" VARCHAR(20) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "telefono" VARCHAR(20) NOT NULL,
    "ciudad" VARCHAR(100) NOT NULL,
    "direccion" VARCHAR(255) NOT NULL,
    "urlfoto" VARCHAR(255) NOT NULL,
    "estado" BOOLEAN NOT NULL,
    "fechcreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechedicion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("idcliente")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "idreserva" SERIAL NOT NULL,
    "idcliente" INTEGER NOT NULL,
    "idhabitacion" INTEGER NOT NULL,
    "fechaingreso" DATE NOT NULL,
    "fechasalida" DATE NOT NULL,
    "totaldias" INTEGER NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "igv" DECIMAL(10,2) NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,
    "estado" BOOLEAN NOT NULL,
    "fechcreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechedicion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("idreserva")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "idusuario" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(10) NOT NULL,
    "idcliente" INTEGER NOT NULL,
    "estado" BOOLEAN NOT NULL,
    "usrcreacion" VARCHAR(100) NOT NULL,
    "fechcreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usredicion" VARCHAR(100) NOT NULL,
    "fechedicion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("idusuario")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "ServiciosHabitacion" ADD CONSTRAINT "ServiciosHabitacion_idhabitacion_fkey" FOREIGN KEY ("idhabitacion") REFERENCES "Habitacion"("idhabitacion") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagenesHabitacion" ADD CONSTRAINT "ImagenesHabitacion_idhabitacion_fkey" FOREIGN KEY ("idhabitacion") REFERENCES "Habitacion"("idhabitacion") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_idcliente_fkey" FOREIGN KEY ("idcliente") REFERENCES "Cliente"("idcliente") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_idhabitacion_fkey" FOREIGN KEY ("idhabitacion") REFERENCES "Habitacion"("idhabitacion") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_idcliente_fkey" FOREIGN KEY ("idcliente") REFERENCES "Cliente"("idcliente") ON DELETE CASCADE ON UPDATE CASCADE;
