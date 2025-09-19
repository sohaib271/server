/*
  Warnings:

  - Changed the type of `reserved_from` on the `Bookings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Bookings" DROP COLUMN "reserved_from",
ADD COLUMN     "reserved_from" TIMESTAMP(3) NOT NULL;
