/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `VerificationSession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VerificationSession_uid_key" ON "VerificationSession"("uid");
