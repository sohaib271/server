/*
  Warnings:

  - Added the required column `item_image` to the `BookingItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_name` to the `BookingItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `BookingItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."BookingItem" ADD COLUMN     "item_image" TEXT NOT NULL,
ADD COLUMN     "item_name" TEXT NOT NULL,
ADD COLUMN     "price" TEXT NOT NULL;
