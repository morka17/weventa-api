/*
  Warnings:

  - You are about to drop the column `owner` on the `AffiliateLink` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `AffiliateLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AffiliateLink" DROP COLUMN "owner",
ADD COLUMN     "ownerId" INTEGER NOT NULL;
