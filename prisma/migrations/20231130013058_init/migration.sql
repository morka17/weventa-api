/*
  Warnings:

  - Added the required column `buyerId` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "buyerId" INTEGER NOT NULL;
