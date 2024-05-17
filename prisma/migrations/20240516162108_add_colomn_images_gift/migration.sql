/*
  Warnings:

  - You are about to drop the column `image` on the `Gift` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Gift" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "ImagesGift" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "giftId" INTEGER NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "ImagesGift_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ImagesGift_giftId_key" ON "ImagesGift"("giftId");

-- AddForeignKey
ALTER TABLE "ImagesGift" ADD CONSTRAINT "ImagesGift_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "Gift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
