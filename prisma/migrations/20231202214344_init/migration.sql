/*
  Warnings:

  - You are about to drop the column `totalPrice` on the `Product` table. All the data in the column will be lost.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "totalPrice",
ADD COLUMN     "commission" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
