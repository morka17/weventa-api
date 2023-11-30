/*
  Warnings:

  - Added the required column `link` to the `AffiliateLink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner` to the `AffiliateLink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `AffiliateLink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `AffiliateLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AffiliateLink" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "link" INTEGER NOT NULL,
ADD COLUMN     "owner" INTEGER NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
