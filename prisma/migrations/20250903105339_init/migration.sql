/*
  Warnings:

  - You are about to drop the column `item_image` on the `BookingItem` table. All the data in the column will be lost.
  - You are about to drop the column `item_name` on the `BookingItem` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `BookingItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."BookingItem" DROP COLUMN "item_image",
DROP COLUMN "item_name",
DROP COLUMN "price";
