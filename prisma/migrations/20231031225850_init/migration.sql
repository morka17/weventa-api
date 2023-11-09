/*
  Warnings:

  - You are about to drop the column `ExpireAt` on the `VerificationSession` table. All the data in the column will be lost.
  - Added the required column `expireAt` to the `VerificationSession` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `code` on the `VerificationSession` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "VerificationSession" DROP COLUMN "ExpireAt",
ADD COLUMN     "expireAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "code",
ADD COLUMN     "code" INTEGER NOT NULL;
