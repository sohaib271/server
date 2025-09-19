/*
  Warnings:

  - Added the required column `table_no` to the `Bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Bookings" ADD COLUMN     "table_no" INTEGER NOT NULL;
