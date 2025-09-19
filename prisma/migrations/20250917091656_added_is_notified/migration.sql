-- AlterTable
ALTER TABLE "public"."Bookings" ADD COLUMN     "isNotified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "reserved_to" SET DATA TYPE TEXT;
