-- CreateTable
CREATE TABLE "RoomBusyDays" (
    "id" SERIAL NOT NULL,
    "nombres" TEXT NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "roomId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "RoomBusyDays_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoomBusyDays" ADD CONSTRAINT "RoomBusyDays_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomBusyDays" ADD CONSTRAINT "RoomBusyDays_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("clientId") ON DELETE RESTRICT ON UPDATE CASCADE;
