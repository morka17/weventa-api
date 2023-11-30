/*
  Warnings:

  - Added the required column `price` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;
