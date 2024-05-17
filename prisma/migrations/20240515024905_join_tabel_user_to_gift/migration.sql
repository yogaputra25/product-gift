/*
  Warnings:

  - Added the required column `userId` to the `Gift` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gift" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Gift" ADD CONSTRAINT "Gift_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
