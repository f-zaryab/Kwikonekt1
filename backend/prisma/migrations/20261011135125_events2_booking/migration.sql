/*
  Warnings:

  - You are about to drop the column `meetingLink` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `LastName` on the `User` table. All the data in the column will be lost.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ParticipationStatus" AS ENUM ('AWAITING_RESPONSE', 'ATTENDING', 'NOT_ATTENDING');

-- DropIndex
DROP INDEX "Event_slug_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "meetingLink";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "LastName",
ADD COLUMN     "lastName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "meetingLink" TEXT,
    "guestName" TEXT NOT NULL,
    "guestEmail" TEXT NOT NULL,
    "startTime" TIMESTAMPTZ(3) NOT NULL,
    "endTime" TIMESTAMPTZ(3) NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "guestAttendanceStatus" "ParticipationStatus" NOT NULL DEFAULT 'AWAITING_RESPONSE',
    "hostAttendanceStatus" "ParticipationStatus" NOT NULL DEFAULT 'AWAITING_RESPONSE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eventId" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "attendeeId" TEXT,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_slug_key" ON "Booking"("slug");

-- CreateIndex
CREATE INDEX "Booking_hostId_startTime_idx" ON "Booking"("hostId", "startTime");

-- CreateIndex
CREATE INDEX "Booking_eventId_idx" ON "Booking"("eventId");

-- CreateIndex
CREATE INDEX "Booking_guestEmail_idx" ON "Booking"("guestEmail");

-- CreateIndex
CREATE INDEX "Booking_attendeeId_idx" ON "Booking"("attendeeId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
