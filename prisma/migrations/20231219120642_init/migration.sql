/*
  Warnings:

  - Added the required column `ownerId` to the `AffiliatePurchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AffiliatePurchase" ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "AffiliatePurchase" ADD CONSTRAINT "AffiliatePurchase_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
