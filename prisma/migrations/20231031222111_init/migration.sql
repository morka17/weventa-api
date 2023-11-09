-- AlterTable
ALTER TABLE "User" ALTER COLUMN "verified" SET DEFAULT false;

-- CreateTable
CREATE TABLE "VerificationSession" (
    "id" SERIAL NOT NULL,
    "uid" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "ExpireAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationSession_pkey" PRIMARY KEY ("id")
);
