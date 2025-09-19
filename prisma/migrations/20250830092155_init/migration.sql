-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "image" TEXT,
ADD COLUMN     "refreshToken" TEXT,
ALTER COLUMN "password" DROP NOT NULL;
