/*
  Warnings:

  - You are about to drop the column `uid` on the `VerificationSession` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `VerificationSession` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `VerificationSession` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "VerificationSession_uid_key";

-- AlterTable
ALTER TABLE "VerificationSession" DROP COLUMN "uid",
ADD COLUMN     "email" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "VerificationSession_email_key" ON "VerificationSession"("email");
