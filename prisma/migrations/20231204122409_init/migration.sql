/*
  Warnings:

  - You are about to drop the column `link` on the `AffiliateLink` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `AffiliateLink` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `AffiliateLink` table. All the data in the column will be lost.
  - Added the required column `userId` to the `AffiliateLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AffiliateLink" DROP COLUMN "link",
DROP COLUMN "ownerId",
DROP COLUMN "updatedAt",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "AffiliatePurchase" (
    "id" SERIAL NOT NULL,
    "linkId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AffiliatePurchase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AffiliateLink" ADD CONSTRAINT "AffiliateLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AffiliateLink" ADD CONSTRAINT "AffiliateLink_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AffiliatePurchase" ADD CONSTRAINT "AffiliatePurchase_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "AffiliateLink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AffiliatePurchase" ADD CONSTRAINT "AffiliatePurchase_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
