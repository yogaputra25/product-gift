-- DropForeignKey
ALTER TABLE "Gift" DROP CONSTRAINT "Gift_userId_fkey";

-- AddForeignKey
ALTER TABLE "Gift" ADD CONSTRAINT "Gift_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
