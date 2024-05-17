-- CreateTable
CREATE TABLE "RedeemedGift" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "giftId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RedeemedGift_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RedeemedGift" ADD CONSTRAINT "RedeemedGift_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedeemedGift" ADD CONSTRAINT "RedeemedGift_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "Gift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
